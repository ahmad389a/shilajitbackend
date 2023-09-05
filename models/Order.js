const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  cartItems: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  billingAddress: {
    firstName: String,
    lastName: String,
  },
  total: Number,
}, {
  timestamps: true,
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
