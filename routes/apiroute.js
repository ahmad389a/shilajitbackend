const express = require("express");
const router = express.Router();
const shop = require("../models/ShopsModel");
const { sendCustomerConfirmationEmail, sendAdminNotificationEmail }  = require("../mailer/mailer");
const  Order  = require("../models/Order");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = Stripe(
  "sk_test_51Nk6wxAQzgSCHThD77QMkQGBsJlg5jxIajwpx4trzL4RmCa1WT2YOG5CnVhwLqaApNT0xjvVbXlJcuLMmdml8Ao900f1JjkQaS"
);
router.use(bodyParser.json());
router.get("/products", async (req, res) => {
  try {
    const products = await shop.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await shop.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, billingAddress } = req.body;
    console.log("------BillingInfo----------", billingAddress);
    const formattedCartItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    let orderCounter = 0;

    function generateOrderNumber() {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
      const day = now.getDate().toString().padStart(2, '0'); 
      orderCounter = (orderCounter + 1) % 1000;
      const counter = orderCounter.toString().padStart(3, '0');
      const orderNumber = `${year}${month}${day}${counter}`;
      return orderNumber;
    }
    const orderNumber = generateOrderNumber();
    const cartItemsJson = JSON.stringify(formattedCartItems);
    const billingAddressJson = JSON.stringify(billingAddress);
    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.shortDescription,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    req.session.orderNumber = orderNumber;
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-status`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        cartItems: cartItemsJson,
        billingAddress: billingAddressJson,
        order_Number:orderNumber,
      },
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .send({
        error: "An error occurred while creating the checkout session.",
      });
  }
});
router.get("/order-status", (req, res) => {
  const orderNumber = req.session.orderNumber;
  res.json({ orderNumber });
});

router.post('/webhook', async (req, res) => {
  const event = req.body;
  try {

    if (event.type === 'checkout.session.completed') {
      const paymentIntent = event.data.object;
      const cartItemsMetadata = JSON.parse(paymentIntent.metadata.cartItems);
      const billingAddressMetadata = JSON.parse(paymentIntent.metadata.billingAddress);
      const orderNumber = paymentIntent.metadata.order_Number;
      const customerEmail = billingAddressMetadata.emailAddress;
      const total = paymentIntent.amount_total;
      const order = new Order({
        orderNumber,
        cartItems: cartItemsMetadata,
        billingAddress: billingAddressMetadata,
        total,
      });
      await order.save();
      await sendCustomerConfirmationEmail(
        customerEmail, 
        orderNumber,
        cartItemsMetadata,
        billingAddressMetadata
      );
      await sendAdminNotificationEmail(orderNumber, cartItemsMetadata, billingAddressMetadata);
      console.log("order creted----------------------------")
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook event:', error);
    res.status(500).json({ error: 'Webhook error' });
  }
});
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get('/orders', async (req, res) => {
  try {
    // Get the date parameter from the query string
    const date = req.query.date;

    // Ensure that the date parameter is provided
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    // Parse the date string into a JavaScript Date object
    const selectedDate = new Date(date);

    // Set the start and end of the selected date (from midnight to 11:59:59 PM)
    selectedDate.setHours(0, 0, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999);

    // Query the database for orders within the selected date range
    const orders = await Order.find({
      createdAt: {
        $gte: selectedDate,
        $lte: endDate,
      },
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by date:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
