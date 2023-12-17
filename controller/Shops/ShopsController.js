const shop = require("../../models/ShopsModel");
const randomstring = require("randomstring");
const Order = require("../../models/Order");
// const Coupon = require ('../..models/CouponModel');

exports.add_product = (req, res) => {
  res.render("ecommerce-add-product", {
    messages: req.flash(),
  });
};
exports.save_product = async (req, res) => {
  const {
    p_name,
    p_size,
    p_qty,
    p_desc,
    p_price,
    p_d_price,
    files,
    m_title,
    m_keywords,
    m_description,
  } = req.body;
  const requiredFields = ["p_name", "p_size", "p_qty", "p_desc", "p_price"];
  const emptyFields = requiredFields.filter((field) => !req.body[field]);
  const sku =
    "sku_" +
    randomstring.generate({
      length: 6,
      charset: "0123456789abcdefghijklmnopqrstvwxyz",
    });
  if (emptyFields.length > 0) {
    emptyFields.forEach((field) => {
      req.flash("error", `${field} is required`);
    });
    return res.redirect("/add_product");
  }
  const fileNames = req.files ? req.files.map((file) => file.filename) : [];
  const p_image = fileNames.join(",");
  const slug = p_name.toLowerCase().replace(/\s+/g, "_");
  try {
    const product = new shop({
      p_name: p_name,
      p_size: p_size,
      p_qty: p_qty,
      p_desc: p_desc,
      p_price: p_price,
      p_d_price: p_d_price,
      slug: slug,
      p_image: p_image,
      m_title: m_title,
      m_keyword: m_keywords,
      m_desc: m_description,
      sku: sku,
    });

    await product.save();
    req.flash("success", "Product saved successfully");
    res.redirect("/products");
  } catch (error) {
    req.flash("error", `Error saving the product: ${error.message}`);
    res.redirect("/add_product");
  }
};
exports.all_products = async (req, res) => {
  try {
    const products = await shop.find({ is_deleted: 0 });
    const messages = req.flash();
    res.render("ecommerce-all-products", { products, messages });
  } catch (error) {
    console.log(error);
    req.flash("error", `Error Fetching  products: ${error.message}`);
    res.redirect("/products");
  }
};

exports.edit_product = async (req, res) => {
  const prod_id = req.params.productId;
  try {
    const product = await shop.findById(prod_id);
    const messages = req.flash();
    res.render("ecommerce-edit-product", { product, messages });
  } catch (error) {
    req.flash("error", `Error Editing the product: ${error.message}`);
    res.redirect("/products");
  }
};

exports.update_product = async (req, res) => {
  const {
    p_name,
    p_size,
    p_qty,
    p_desc,
    p_price,
    p_d_price,
    m_title,
    m_keywords,
    m_description,
  } = req.body;
  const requiredFields = ["p_name", "p_size", "p_qty", "p_desc", "p_price"];
  const emptyFields = requiredFields.filter((field) => !req.body[field]);
  const productId = req.params.productId;
  if (emptyFields.length > 0) {
    emptyFields.forEach((field) => {
      req.flash("error", `${field} is required`);
    });
    return res.redirect(`/edit-product/${productId}`);
  }
  const slug = p_name.toLowerCase().replace(/\s+/g, "_");
  try {
    const existingProduct = await shop.findById(productId);

    if (!existingProduct) {
      req.flash("error", "Product not found");
      return res.redirect("/products");
    }
    if (req.files && req.files.length > 0) {
      const fileNames = req.files.map((file) => file.filename);
      const p_image = fileNames.join(",");
      existingProduct.p_image = p_image;
    }
    existingProduct.p_name = p_name;
    existingProduct.p_size = p_size;
    existingProduct.p_qty = p_qty;
    existingProduct.p_desc = p_desc;
    existingProduct.p_price = p_price;
    existingProduct.p_d_price = p_d_price;
    existingProduct.slug = slug;
    existingProduct.m_title = m_title;
    existingProduct.m_keyword = m_keywords;
    existingProduct.m_desc = m_description;
    await existingProduct.save();
    req.flash("success", "Product updated successfully");
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    req.flash("error", `Error updating the product: ${error.message}`);
    res.redirect(`/edit-product/${productId}`);
  }
};
exports.view_product = async (req, res) => {
  const prod_id = req.params.productId;
  try {
    const product = await shop.findById(prod_id);
    const messages = req.flash();
    res.render("product-details", { product, messages });
  } catch (error) {
    req.flash("error", `Error Editing the product: ${error.message}`);
    res.redirect("/products");
  }
};
exports.delete_product = async (req, res) => {
  const productId = req.body.productId;
  try {
    const result = await shop.findByIdAndUpdate(productId, { is_deleted: 1 });
    req.flash("success", "Product deleted successfully");
    res.redirect("/products");
  } catch (error) {
    req.flash("error", `Error Deleting the product: ${error.message}`);
    res.redirect("/products");
  }
};
exports.all_orders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const messages = req.flash();
    console.log("-----------------------", messages, orders);
    res.render("ecommerce-orders", { orders, messages });
  } catch (error) {
    console.log(error);
    req.flash("error", `Error Fetching  orders: ${error.message}`);
    res.redirect("/products");
  }
};
// exports.all_coupons = async (req, res) => {
//   try {
//     const coupons = await Coupon.find();
//     const messages = req.flash();
//     console.log("-----------------------",coupons)
//     res.render('ecommerce-all-coupon', {coupons,messages});
//   } catch (error) {
//     console.log(error)
//     req.flash("error", `Error Fetching  orders: ${error.message}`);
//     res.redirect("/products");
//   }
// };
