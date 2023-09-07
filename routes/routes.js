const express = require('express');
const route = express.Router();

const AuthController = require("../controller/AuthController");
const ShopsController = require("../controller/Shops/ShopsController");
const testingController = require("../controller/testingController");
const { uploads } = require('../middlewares/uploadsWithMulter');

module.exports = function (route) {
    route.use((req, res, next) => {
        var uemail = req.session.useremail;
        const allowUrls = ["/login", "/auth-validate", "/register", "/signup", "/forgotpassword", "/sendforgotpasswordlink", "/resetpassword", "/error", "/changepassword"];
        if (allowUrls.indexOf(req.path) !== -1) {
            if (uemail != null && uemail != undefined) {
                return res.redirect('/');
            }

        } else if (!uemail) {
            return res.redirect('/login');
        }
        next();
    })
    // Shops
    route.get("/add_product", ShopsController.add_product)
    route.get("/products", ShopsController.all_products)
    route.post("/save_product",uploads.array('files', 5),  ShopsController.save_product)
    route.get("/edit-product/:productId", ShopsController.edit_product)
    route.get("/view-product/:productId", ShopsController.view_product)
    route.post("/update-product/:productId", uploads.array('files', 5),ShopsController.update_product)
    route.post("/delete-product/", ShopsController.delete_product)
    route.get("/orders", ShopsController.all_orders)


    route.get('/auth-confirm-mail', (req, res, next) => {
        res.render('auth-confirm-mail', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-email-verification', (req, res, next) => {
        res.render('auth-email-verification', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-lock-screen', (req, res, next) => {
        res.render('auth-lock-screen', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-login', (req, res, next) => {
        res.render('auth-login', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-logout', (req, res, next) => {
        res.render('auth-logout', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-recoverpw', (req, res, next) => {
        res.render('auth-recoverpw', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-register', (req, res, next) => {
        res.render('auth-register', { layout: 'layout/layout-without-nav' });
    })
    route.get('/auth-two-step-verification', (req, res, next) => {
        res.render('auth-two-step-verification', { layout: 'layout/layout-without-nav' });
    })


    route.get('/', (req, res, next) => {
        res.render('index', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards' });
    })
    route.get('/index', (req, res, next) => {
        res.render('index', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards' });
    })
    route.get('/apps-calendar', (req, res, next) => {
        res.render('apps-calendar');
    })
    route.get('/apps-chat', (req, res, next) => {
        res.render('apps-chat');
    })
    route.get('/charts-apex', (req, res, next) => {
        res.render('charts-apex');
    })
    route.get('/charts-chartjs', (req, res, next) => {
        res.render('charts-chartjs');
    })
    route.get('/contacts-grid', (req, res, next) => {
        res.render('contacts-grid');
    })
    route.get('/contacts-list', (req, res, next) => {
        res.render('contacts-list');
    })
    route.get('/contacts-profile', (req, res, next) => {
        res.render('contacts-profile');
    })
    route.get('/ecommerce-cart', (req, res, next) => {
        res.render('ecommerce-cart');
    })
    route.get('/ecommerce-customers', (req, res, next) => {
        res.render('ecommerce-customers');
    })
    route.get('/ecommerce-checkout', (req, res, next) => {
        res.render('ecommerce-checkout');
    })
    route.get('/ecommerce-orders', (req, res, next) => {
        res.render('ecommerce-orders');
    })
    route.get('/ecommerce-product-detail', (req, res, next) => {
        res.render('ecommerce-product-detail');
    })
    route.get('/ecommerce-products', (req, res, next) => {
        res.render('ecommerce-products');
    })
    route.get('/ecommerce-shops', (req, res, next) => {
        res.render('ecommerce-shops');
    })
    route.get('/email-inbox', (req, res, next) => {
        res.render('email-inbox');
    })
    route.get('/email-read', (req, res, next) => {
        res.render('email-read');
    })
    route.get('/extended-lightbox', (req, res, next) => {
        res.render('extended-lightbox');
    })
    route.get('/extended-notifications', (req, res, next) => {
        res.render('extended-notifications');
    })
    route.get('/extended-rangeslider', (req, res, next) => {
        res.render('extended-rangeslider');
    })
    route.get('/extended-rating', (req, res, next) => {
        res.render('extended-rating');
    })
    route.get('/extended-sweet-alert', (req, res, next) => {
        res.render('extended-sweet-alert');
    })
    route.get('/form-advanced', (req, res, next) => {
        res.render('form-advanced');
    })
    route.get('/form-editors', (req, res, next) => {
        res.render('form-editors');
    })
    route.get('/form-elements', (req, res, next) => {
        res.render('form-elements');
    })
    route.get('/form-mask', (req, res, next) => {
        res.render('form-mask');
    })
    route.get('/form-uploads', (req, res, next) => {
        res.render('form-uploads');
    })
    route.get('/form-validation', (req, res, next) => {
        res.render('form-validation');
    })
    route.get('/form-wizard', (req, res, next) => {
        res.render('form-wizard');
    })
    route.get('/icons-boxicons', (req, res, next) => {
        res.render('icons-boxicons');
    })
    route.get('/icons-dripicons', (req, res, next) => {
        res.render('icons-dripicons');
    })
    route.get('/icons-feather', (req, res, next) => {
        res.render('icons-feather');
    })
    route.get('/icons-fontawesome', (req, res, next) => {
        res.render('icons-fontawesome');
    })
    route.get('/icons-materialdesign', (req, res, next) => {
        res.render('icons-materialdesign');
    })
    route.get('/invoices-detail', (req, res, next) => {
        res.render('invoices-detail');
    })
    route.get('/invoices-list', (req, res, next) => {
        res.render('invoices-list');
    })
    route.get('/layouts-vertical', (req, res, next) => {
        res.render('layouts-vertical', { layout: 'layout/layout-vertical' });
    })
    route.get('/maps-google', (req, res, next) => {
        res.render('maps-google');
    })
    route.get('/maps-leaflet', (req, res, next) => {
        res.render('maps-leaflet');
    })
    route.get('/maps-vector', (req, res, next) => {
        res.render('maps-vector');
    })
    route.get('/pages-faqs', (req, res, next) => {
        res.render('pages-faqs');
    })
    route.get('/pages-pricing', (req, res, next) => {
        res.render('pages-pricing');
    })
    route.get('/pages-starter', (req, res, next) => {
        res.render('pages-starter');
    })
    route.get('/pages-timeline', (req, res, next) => {
        res.render('pages-timeline');
    })
    route.get('/tables-advanced', (req, res, next) => {
        res.render('tables-advanced');
    })
    route.get('/tables-basic', (req, res, next) => {
        res.render('tables-basic');
    })
    route.get('/ui-alerts', (req, res, next) => {
        res.render('ui-alerts');
    })
    route.get('/ui-buttons', (req, res, next) => {
        res.render('ui-buttons');
    })
    route.get('/ui-cards', (req, res, next) => {
        res.render('ui-cards');
    })
    route.get('/ui-carousel', (req, res, next) => {
        res.render('ui-carousel');
    })
    route.get('/ui-colors', (req, res, next) => {
        res.render('ui-colors');
    })
    route.get('/ui-dropdowns', (req, res, next) => {
        res.render('ui-dropdowns');
    })
    route.get('/ui-general', (req, res, next) => {
        res.render('ui-general');
    })
    route.get('/ui-grid', (req, res, next) => {
        res.render('ui-grid');
    })
    route.get('/ui-images', (req, res, next) => {
        res.render('ui-images');
    })
    route.get('/ui-modals', (req, res, next) => {
        res.render('ui-modals');
    })
    route.get('/ui-offcanvas', (req, res, next) => {
        res.render('ui-offcanvas');
    })
    route.get('/ui-placeholders', (req, res, next) => {
        res.render('ui-placeholders');
    })
    route.get('/ui-progressbars', (req, res, next) => {
        res.render('ui-progressbars');
    })
    route.get('/ui-tabs-accordions', (req, res, next) => {
        res.render('ui-tabs-accordions');
    })
    route.get('/ui-typography', (req, res, next) => {
        res.render('ui-typography');
    })
    route.get('/ui-video', (req, res, next) => {
        res.render('ui-video');
    })

    route.get('/pages-404', (req, res, next) => {
        res.render('pages-404', { layout: 'layout/layout-without-nav' });
    })
    route.get('/pages-500', (req, res, next) => {
        res.render('pages-500', { layout: 'layout/layout-without-nav' });
    })
    route.get('/pages-comingsoon', (req, res, next) => {
        res.render('pages-comingsoon', { layout: 'layout/layout-without-nav' });
    })
    route.get('/pages-maintenance', (req, res, next) => {
        res.render('pages-maintenance', { layout: 'layout/layout-without-nav' });
    })





    // Auth
    route.get('/login', (req, res, next) => {
        res.render('auth/login', { title: 'Login', layout: 'layout/layout-without-nav', 'message': req.flash('message'), error: req.flash('error') })
    })

    // validate login form
    route.post("/auth-validate", AuthController.validate)

    // logout
    route.get("/logout", AuthController.logout);

    route.get('/register', (req, res, next) => {
        res.render('auth/register', { title: 'Register', layout: 'layout/layout-without-nav', 'message': req.flash('message'), 'error': req.flash('error') })
    })

    // validate register form
    route.post("/signup", AuthController.signup)
    // Testing
    route.get('/add-product', testingController.getRegisterPage);
    route.get('/testing-product', testingController.testing_products);
    route.post("/add_proudcts", testingController.add_proudct)


    route.get('/forgotpassword', (req, res, next) => {
        res.render('auth/forgotpassword', { title: 'Forgot password', layout: 'layout/layout-without-nav', message: req.flash('message'), error: req.flash('error') })
    })

    // send forgot password link on user email
    route.post("/sendforgotpasswordlink", AuthController.forgotpassword)

    // reset password
    route.get("/resetpassword", AuthController.resetpswdview);
    // Change password
    route.post("/changepassword", AuthController.changepassword);

    //500
    route.get('/error', (req, res, next) => {
        res.render('auth/auth-500', { title: '500 Error', layout: 'layout/layout-without-nav' });
    })
}
