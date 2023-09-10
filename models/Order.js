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
    streetAddress:String,
    townCity:String,
    stateCounty:String,
    postcodeZIP:String,
    phone:String,
    emailAddress:String,

  },
  total: Number,
  stripeid:String,
}, {
  timestamps: true,
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
