const coupons = require ("../../models/CouponModel");

exports.coupon = async (req, res) => {
  try {
    const coupens = await coupons.find({ is_deleted: 0 });
    const messages = req.flash();
    res.render('ecommerce-all-coupon', { coupens ,messages});
  } catch (error) {
    console.log(error)
    req.flash("error", `Error Fetching  products: ${error.message}`);
    res.redirect("/coupons");
  }
};

exports.add_coupon = (req, res) => {
  res.render("ecommerce-add-coupons", {
    messages: req.flash(),
  });
};
exports.save_coupon = async (req, res) => {
  const { c_name, c_expiry, c_discount_price } = req.body;
  const requiredFields = ['c_name', 'c_expiry', 'c_discount_price'];
  const emptyFields = requiredFields.filter(field => !req.body[field]);

  if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
      req.flash("error", `${field} is required`);
      });
      return res.redirect("/add_coupon");
  }
    try {
      const coupon = new coupons({
        c_name:c_name,
        c_expiry:c_expiry,
        c_discount_price:c_discount_price,
      });
      await coupon.save();
      req.flash("success", "Coupon saved successfully");
      // setTimeout(() => {
      //   res.redirect("/coupons");
      // }, 30);

      res.redirect("/coupons");
    } catch (error) {
      console.log("----------------------------",error.message);
      req.flash("error", `Error saving the Coupon: ${error.message}`);
      res.redirect("/add_coupon");
    }
};
exports.edit_coupon = async (req,res) =>{
  const coupon_id = req.params.couponId;
  try{
    const coupon = await coupons.findById(coupon_id);
    const messages = req.flash();
    res.render('ecommerce-edit-coupon', { coupon ,messages});
  }catch (error){
    req.flash("error", `Error Editing the coupon: ${error.message}`);
    res.redirect("/coupons");
  }
};

exports.update_coupon = async (req, res) => {
  const {c_name,c_expiry,c_discount_price } = req.body;
  const requiredFields = ['c_name','c_expiry','c_discount_price' ];
  const emptyFields = requiredFields.filter(field => !req.body[field]);
  const couponId = req.params.couponId;
  if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
          req.flash("error", `${field} is required`);
      });
      return res.redirect(`/edit_coupon/${couponId}`);
      }
 
  try {
      const existingCoupon = await coupons.findById(couponId);

      if (!existingCoupon) {
          req.flash("error", "Coupon not found");
          return res.redirect("/coupons");
      }
      // if (req.files && req.files.length > 0) {
      //     const fileNames = req.files.map(file => file.filename);
      //     const p_image = fileNames.join(',');
      //     existingProduct.p_image = p_image;
      // }
      existingCoupon.c_name = c_name;
      existingCoupon.c_expiry = c_expiry;
      existingCoupon.c_discount_price = c_discount_price;
     
      await existingCoupon.save();
      req.flash("success", "Coupon updated successfully");
      res.redirect("/coupons");
  } catch (error) {
      console.log(error)
      req.flash("error", `Error updating the Coupon: ${error.message}`);
      res.redirect(`/edit_coupon/${couponId}`);
  }
};

exports.delete_coupon = async (req, res) => {
  console.log("ererererr")
  const couponId = req.body.couponId;
  console.log("-------------------",req.body);
  try {
    const result = await coupons.findByIdAndUpdate(couponId, { is_deleted: 1 });
    req.flash("success",'Product deleted successfully');
    res.redirect("/coupons");
  } catch (error) {
    req.flash("error", `Error Deleting the product: ${error.message}`);
      res.redirect("/coupons");
  }
};

