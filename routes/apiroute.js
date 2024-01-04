const express = require("express");
const router = express.Router();
const shop = require("../models/ShopsModel");
const {
  sendCustomerConfirmationEmail,
  sendAdminNotificationEmail,
} = require("../mailer/mailer_new");
const Order = require("../models/Order");
const Coupon = require("../models/CouponModel");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = Stripe(
  "sk_test_51Np5KJLohDizpnvPyxcbbf7SwYK8FroqhiahUi9ixNtyfmfsue1H33WXbchduKiTjYgOSb5XukWQxhAt7wbRlmzr00oENgStEE"
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
router.get("/coupons/:couponName", async (req, res) => {
  try {
    const couponName = req.params.couponName;
    const coupon = await Coupon.findOne({ c_name: couponName }).sort({
      createdAt: -1,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, billingAddress, couponDetails } = req.body;
    const formattedCartItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    let c_discount_price = "";
    let discountPercentage = "";
    const formattedcouponDetails = JSON.stringify(couponDetails);
    if (couponDetails) {
      c_discount_price = couponDetails.c_discount_price || 1;
      console.log("----C_price-----", c_discount_price);
      discountPercentage = 1 - c_discount_price / 100;
      console.log("----discountPercentage-----", discountPercentage);
    }
    const totalDiscount = couponDetails
      ? cartItems.reduce((total, item) => {
          const discountedPrice = item.price * discountPercentage;
          const discount = item.price - discountedPrice;
          return total + discount * item.quantity;
        }, 0)
      : 0;
    console.log("total_Discount", totalDiscount);
    function generateOrderNumber() {
      const min = 100000;
      const max = 999999;
      const orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return orderNumber.toString();
    }
    const orderNumber = generateOrderNumber();
    const cartItemsJson = JSON.stringify(formattedCartItems);
    const billingAddressJson = JSON.stringify(billingAddress);
    const line_items = cartItems.map((item) => {
      let total_amount = "";
      if (discountPercentage) {
        total_amount = item.price * discountPercentage;
      } else {
        total_amount = item.price;
      }
      console.log("discountedPrice---------------", total_amount);
      return {
        price_data: {
          currency: "NOK",
          product_data: {
            name: item.name,
            description: item.shortDescription,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: Math.round(total_amount * 100),
        },
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}order-status?orderNumber=${orderNumber}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        cartItems: cartItemsJson,
        billingAddress: billingAddressJson,
        order_Number: orderNumber,
        discount: totalDiscount,
        discountedPrices: formattedcouponDetails,
      },
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({
      error: "An error occurred while creating the checkout session.",
    });
  }
});

router.post("/webhook", async (req, res) => {
  const event = req.body;
  try {
    if (event.type === "checkout.session.completed") {
      const paymentIntent = event.data.object;
      const cartItemsMetadata = JSON.parse(paymentIntent.metadata.cartItems);
      const CustomercartItemsMetadata = JSON.parse(
        paymentIntent.metadata.cartItems
      );
      const couponDetailsMetadata = JSON.parse(
        paymentIntent.metadata.discountedPrices
      );
      console.log("demo----", couponDetailsMetadata);
      const billingAddressMetadata = JSON.parse(
        paymentIntent.metadata.billingAddress
      );
      const CustomerbillingAddressMetadata = JSON.parse(
        paymentIntent.metadata.billingAddress
      );
      const orderNumber = paymentIntent.metadata.order_Number;
      const discountAmount = Math.round(
        parseFloat(paymentIntent.metadata.discount || 0)
      );
      const customerdiscountAmount = Math.round(
        parseFloat(paymentIntent.metadata.discount || 0)
      );
      const total = paymentIntent.amount_total;
      const Customertotal = paymentIntent.amount_total;
      const subtotal = paymentIntent.amount_subtotal;
      const email_address = billingAddressMetadata.emailAddress;
      const stripe_id = paymentIntent.id;
      const existingOrder = await Order.findOne({ orderNumber });

      if (existingOrder) {
        existingOrder.couponDetails = couponDetailsMetadata;
        existingOrder.discountAmount = discountAmount;
        await existingOrder.save();
        await sendCustomerConfirmationEmail(
          email_address,
          orderNumber,
          CustomercartItemsMetadata,
          CustomerbillingAddressMetadata,
          Customertotal,
          customerdiscountAmount
        );
        await sendAdminNotificationEmail(
          orderNumber,
          total,
          cartItemsMetadata,
          discountAmount,
          billingAddressMetadata
        );
        console.log(
          `Order with order number ${orderNumber} already exists. Skipping duplicate processing.`
        );
        return res.json({ received: true });
      }
      const order = new Order({
        orderNumber,
        cartItems: cartItemsMetadata,
        billingAddress: billingAddressMetadata,
        couponDetails: couponDetailsMetadata,
        total,
        discountAmount,
        stripe_id,
      });
      await order.save();

      console.log("order creted----------------------------");
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook event:", error);
    res.status(500).json({ error: "Webhook error" });
  }
});
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/orders", async (req, res) => {
  try {
    const date = req.query.date;

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: selectedDate,
        $lte: endDate,
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
