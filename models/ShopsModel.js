const mongoose = require("mongoose");
const ShopSchema = new mongoose.Schema({
    p_name: {
        type: String,
        required: true
    },
    p_size:{
        type:Number,
        required:true,
    },
    p_price:{
        type:Number,
        required:true,
    },
    p_d_price:{
        type:Number,
        required:true,
    },
    p_qty:{
        type:Number,
        required:true,
    },
    p_desc:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    p_image:{
        type:String,
        required:false,
    },
    is_deleted:{
        type:Number,
        default: 0,
    },
    m_title:{
        type:String,
        required:false,
    },
    m_keyword:{
        type:String,
        required:false,
    },
    m_desc:{
        type:String,
        required:false,
    },
    sold:{
        type:String,
        required:false,
    },
    sku:{
        type:String,
        required:false,
    }
},
{
    timestamps: true, 
  }
);
const shops = mongoose.model('Shops', ShopSchema);
module.exports = shops;