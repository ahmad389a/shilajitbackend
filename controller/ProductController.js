const product_modle = require('../models/ProductModel');
const ProductModel = require('../models/ProductModel')

// rendering  the product view

exports.GetProductAddPage = (req,res)=>{
    res.render('products/index');
}


// adding products
exports.AddShilajitProduct = async (req, res) => {

    console.log(req.body);
    try {
      const {
        p_name,
        p_price,
        p_images,
        Quantity,
        discount_price,
        p_description,
        p_size,
        meta_title,
        meta_keywords,
        meta_description,
      } = req.body;
  
      const p_id = await ProductModel.countDocuments() + 1; // Manually incrementing the ID
      const slug = p_name.replace(/\s+/g, '-').toLowerCase(); // Generating slug from product name
      const by_defualt_is_deleted = false; // Defaulting to false
  
      const newProduct = new ProductModel({
        p_id : p_id,
        p_name: p_name,
        p_price: p_price,
        p_images: p_images,
        slug: slug,
        by_defualt_is_deleted: by_defualt_is_deleted,
        Quantity: Quantity,
        discount_price: discount_price,
        p_description: p_description,
        p_size: p_size,
        meta_title: meta_title,
        meta_keywords: meta_keywords,
        meta_description: meta_description
      });
  
      await newProduct.save();

      req.flash('message', 'Product Added successful.');
      return res.redirect('/ecommerce-add-product');

    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the product' });
      req.flash('error', 'An error occurred during Adding.');
      return res.redirect('/ecommerce-add-product');
    }

  };

  // fetching all products
  exports.fetch_all_products = (req, res) => {
    product_modle.find()
      .then((prod) => {
        const title = 'Products List';
        console.log(prod);
        res.render('products/viewproducts', {title, prod });
      })
      .catch((err) => {
        // Handle errors
        res.status(500).send('Error fetching Products from the database');
      });
  };


// Render the edit product page
exports.renderEditProductPage = async (req, res) => {
    try {
      const product = await ProductModel.findOne({ p_id: req.params.id });
      if (!product) {
        req.flash('error', 'Product not found');
        return res.redirect('products/viewproducts');
      }
      const title = 'Edit Product';
      res.render('products/edit', { title, product });
    } catch (error) {
      res.status(500).send('An error occurred while fetching the product');
    }
  };
  
  // Handle product update
  exports.updateProduct = async (req, res) => {
    try {
     
      const updatedProduct = {
        p_name: req.body.p_name,
        p_price: req.body.p_price,
        p_size: req.body.p_size,
        Quantity: req.body.Quantity,
        discount_price: req.body.discount_price,
        p_description: req.body.p_description,
        meta_title: req.body.meta_title,
        meta_keywords: req.body.meta_keywords,
        meta_description: req.body.meta_description
      };
  
      // Update the product in the database
      await ProductModel.findOneAndUpdate({ p_id: req.params.id }, updatedProduct);
  
      req.flash('message', 'Product updated successfully.');
      res.redirect('/viewofproducts');
    } catch (error) {
      res.status(500).send('An error occurred while updating the product');
    }
  };
  
  // Handle product deletion
  exports.deleteProduct = async (req, res) => {
    try {
      await ProductModel.findOneAndDelete({ p_id: req.params.id });
      req.flash('message', 'Product deleted successfully.');
      res.redirect('/viewofproducts');
    } catch (error) {
      res.status(500).send('An error occurred while deleting the product');
    }
  };
  
  
