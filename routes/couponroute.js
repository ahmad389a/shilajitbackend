const express = require('express');
const router = express.Router();
const Coupon = require("../models/CouponModel");

// router.post('/save_coupon', async (req, res) => {
//     try {
//         // Extract form data from the request body
//         const { c_name, c_expiry, c_discount_price } = req.body;

//         // Create a new document based on the form data
//         const newCoupon = new Coupon({
//             c_name,
//             c_expiry,
//             c_discount_price,
//         });

//         // Save the document to the MongoDB database
//         await newCoupon.save();

//         res.status(201).json({ message: 'Coupon added successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

module.exports = router;
