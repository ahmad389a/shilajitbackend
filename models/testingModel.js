const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required:false
    },
    size: {
        type: String,
        required: true
    },
    created_at: Date,
})
const products_testing = mongoose.model('test_products', ProductSchema);
module.exports = products_testing;
