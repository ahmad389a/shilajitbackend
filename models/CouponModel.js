const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  
    c_name:{
     type: String,
     unique:true,
     require: true,
    },
    c_expiry:{
     type: Date,
     require: true
    }, 
    c_discount_price:{
     type: Number,
     require: true
    },
    c_Validity:{
        type: Number,
     require: true 
    },
    is_deleted:{
        type:Number,
        default: 0,
    }
 
 });
 const Coupon = mongoose.model('coupons', CouponSchema);
 module.exports = Coupon;