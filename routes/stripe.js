const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(
  "sk_test_51Nk6wxAQzgSCHThD77QMkQGBsJlg5jxIajwpx4trzL4RmCa1WT2YOG5CnVhwLqaApNT0xjvVbXlJcuLMmdml8Ao900f1JjkQaS"
);
// const stripe =  Stripe(process.env.STRIPE_SECRET_KEY);
router.post("/create-checkout-session", async (req, res) => {
  console.log("vvvvvvvvvvvv");
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'usd',
  //         product_data: {
  //           name: 'T-shirt',
  //         },
  //         unit_amount: 2000,
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: `${process.env.CLIENT_URL}/checkout-success`,
  //   cancel_url: `${process.env.CLIENT_URL}/cart`,
  // });

  // res.send({url:session.url});
});
module.exports = router;
