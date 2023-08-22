const mongo = require('mongoose')


const ProductSchema = new mongo.Schema({
   p_id:{
    type: Number,
    require:true
   },
   p_name:{
    type: String,
    require: true
   },
   p_price:{
    type: Number,
    require: true
   },
   slug:{
    type: String,
    require: false
   },
   p_images:{
    type: [String],
    require:true
   },
   by_defualt_is_deleted:{
    type: Boolean,
    require: true
   },
   Quantity:{
    type: Number,
    require: true
   },
   discount_price:{
    type: Number,
    require: true
   },
   p_description:{
    type: String,
    require: true
   },
   p_size:{
    type: String,
    require: true
   },
   meta_title:{
    type: String,
    require: true
   },
   meta_keywords:{
    type: String,
    require: true
   },
   meta_description:{
    type: String,
    require: true
   }

})

const product_modle = mongo.model("shilajit_products",ProductSchema);
module.exports = product_modle;