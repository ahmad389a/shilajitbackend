const Product_tab = require('../models/testingModel'); // Import your User model

exports.getRegisterPage = (req, res) => {
  res.render('testing/index', {
    title: 'Product',
  });
};


exports.testing_products = (req, res) => {
    Product_tab.find()
      .then((prod) => {
        const title = 'Products List';
        res.render('testing/index_dash', {title, prod });
      })
      .catch((err) => {
        // Handle errors
        res.status(500).send('Error fetching blogs from the database');
      });
  };

exports.add_proudct = async (req, res) => {
  const { name, price, size } = req.body;

  try {
    const new_prod = new Product_tab({
      name: name,
      price:price,
      size:size,    
    });

    await new_prod.save();

    req.flash('message', 'Product Added successful.');
    return res.redirect('/add-product');
  } catch (error) {
    console.error('Error in Add Product:', error);
    req.flash('error', 'An error occurred during Adding.');
    return res.redirect('/add-product');
  }
};
