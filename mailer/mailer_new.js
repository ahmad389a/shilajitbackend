const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "naturenskatter@gmail.com",
    pass: "uufpjwpnfraosuan",
  },
});

const sendCustomerConfirmationEmail = async (
  email_address,
  orderNumber,
  CustomercartItemsMetadata,
  CustomerbillingAddressMetadata,
  Customertotal,
  customerdiscountAmount
) => {
  const today = new Date();
  const estimatedDeliveryDate = new Date(today);
  estimatedDeliveryDate.setDate(today.getDate() + 5);
  const formattedEstimatedDeliveryDate = `${estimatedDeliveryDate.toLocaleString('default', { month: 'long' })} ${estimatedDeliveryDate.getDate()}, ${estimatedDeliveryDate.getFullYear()}`;
  const customerEmailOptions = {
    from: "naturenskatter@gmail.com",
    to: email_address,
    subject: "Order Confirmation",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
    
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    @media screen and (max-width: 480px) {
        .mobile-hide {
            display: none !important;
        }
        .mobile-center {
            text-align: center !important;
        }
    }
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    
    
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
    </div>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#047b04">
                   
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                    <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Naturensskater</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                    <table cellspacing="0" cellpadding="0" border="0" align="right">
                                        <tr>
                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                            </td>
                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                <a href="https://naturensskatter.com/" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                  
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 0px;">
                                <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                Thank You For Your Order!
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                <td colspan="3" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                    Order Confirmation # ${orderNumber}
                                  </td>
                                </tr>
                                    ${Array.isArray(CustomercartItemsMetadata) && CustomercartItemsMetadata.length > 0
                                      ? `
                                      <tr>
                                      <th style="border: 1px solid black; border-top: 1px solid black; padding: 10px; text-align: center;" bgcolor="#eeeeee">Item</th>
                                      <th style="border: 1px solid black; border-top: 1px solid black; padding: 10px; text-align: center;" bgcolor="#eeeeee">Quantity</th>
                                      <th style="border: 1px solid black; border-top: 1px solid black; padding: 10px; text-align: center;" bgcolor="#eeeeee">Price</th>
                                    </tr>
                                        ${CustomercartItemsMetadata.map(
                                          (item) => `
                                            <tr>
                                              <td style="border: 1px solid #eeeeee; padding: 10px;  text-align: center;"">${item.name}</td>
                                              <td style="border: 1px solid #eeeeee; padding: 10px; text-align: center;"">${item.quantity} </td>
                                              <td style="border: 1px solid #eeeeee; padding: 10px; text-align: right;"">Kr ${(item.price).toFixed(2)}</td>
                                            </tr>
                                          `
                                        ).join("")}
                                      `
                                      : "<tr><td colspan='3'>No items in the cart</td></tr>"}
                                      <tr align="right" style="width: 300px;">
                                        <th colspan="2" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">Shipping</th>
                                        <td colspan="2" align="right" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          Free
                                        </td>
                                      </tr>
                                      <tr  align="right" style="width: 300px;">
                                        <th colspan="2" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">Discount</th>
                                        <td colspan="2" align="right" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          Kr ${customerdiscountAmount.toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr  align="right" style="width: 300px;">
                                        <th colspan="2" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">VAT</th>
                                        <td colspan="2" align="right" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          15% Included
                                        </td>
                                      </tr>                              
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                            TOTAL
                                        </td>
                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                           Kr ${(Customertotal /100).toFixed(2)}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    </td>
                </tr>
                 <tr>
                    <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0;">
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                <p style="font-weight: 800;">Delivery Address</p>
                                                <p>${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.firstName : ''} ${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.lastName : ''}<br>${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.streetAddress : ''} ${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.townCity : ''} ${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.postcodeZIP : ''} ${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.stateCounty : ''}<br>${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.phone : ''}<br>${CustomerbillingAddressMetadata ? CustomerbillingAddressMetadata.emailAddress : ''}</p>
    
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                <p style="font-weight: 800;">Estimated Delivery Date</p>
                                                <p>${formattedEstimatedDeliveryDate}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style=" padding: 0px; background-color: #047b04;" bgcolor="#047b04">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="padding: 25px 0 15px 0;">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                          <a href="https://naturensskatter.com/" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: black; text-decoration: none; border-radius: 5px; background-color: white; padding: 15px 30px; border: 1px solid #047b04; display: block;">Again Shop</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center">
                                <img src="https://naturensskatter.com/favicon.ico" width="50" height="50" style="display: block; border: 0px;"/>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                    OSLO Norway<br>
                                </p>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    
    `,
  };

  try {
    await transporter.sendMail(customerEmailOptions);
    console.log("Customer confirmation email sent");
  } catch (error) {
    console.error("Error sending customer confirmation email:", error);
  }
};

const sendAdminNotificationEmail = async (
  orderNumber,
  total,
  cartItemsMetadata,
  discountAmount,
  billingAddressMetadata
) => {
  const today = new Date();
  const estimatedDeliveryDate = new Date(today);
  estimatedDeliveryDate.setDate(today.getDate() + 5);
  const formattedEstimatedDeliveryDate = `${estimatedDeliveryDate.toLocaleString('default', { month: 'long' })} ${estimatedDeliveryDate.getDate()}, ${estimatedDeliveryDate.getFullYear()}`;
  const adminEmailOptions = {
    from: "naturenskatter@gmail.com", 
    to: "naturenskatter@gmail.com",
    subject: "New Order Notification",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
    
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    @media screen and (max-width: 480px) {
        .mobile-hide {
            display: none !important;
        }
        .mobile-center {
            text-align: center !important;
        }
    }
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    
    
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
    </div>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#047b04">
                   
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                    <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Naturensskater</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                    <table cellspacing="0" cellpadding="0" border="0" align="right">
                                        <tr>
                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                            </td>
                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                <a href="https://naturensskatter.com/" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                  
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 0px;">
                                <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                    New Ordered has been Placed!
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                <td colspan="3" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                    Order Confirmation # ${orderNumber}
                                  </td>
                                </tr>
                                    ${Array.isArray(cartItemsMetadata) && cartItemsMetadata.length > 0
                                      ? `
                                      <tr>
                                      <th style="border: 1px solid black; border-top: 1px solid black; padding: 10px; text-align: center;" bgcolor="#eeeeee">Item</th>
                                      <th style="border: 1px solid black; border-top: 1px solid black; padding: 10px; text-align: center;" bgcolor="#eeeeee">Quantity</th>
                                      <th style="border: 1px solid black; border-top: 1px solid black; padding: 10px; text-align: center;" bgcolor="#eeeeee">Price</th>
                                    </tr>
                                        ${cartItemsMetadata.map(
                                          (item) => `
                                            <tr>
                                              <td style="border: 1px solid #eeeeee; padding: 10px;  text-align: center;"">${item.name}</td>
                                              <td style="border: 1px solid #eeeeee; padding: 10px; text-align: center;"">${item.quantity} </td>
                                              <td style="border: 1px solid #eeeeee; padding: 10px; text-align: right;"">Kr ${(item.price).toFixed(2)}</td>
                                            </tr>
                                          `
                                        ).join("")}
                                      `
                                      : "<tr><td colspan='3'>No items in the cart</td></tr>"}
                                      <tr align="right" style="width: 300px;">
                                        <th colspan="2" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">Shipping</th>
                                        <td colspan="2" align="right" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          Free
                                        </td>
                                      </tr>
                                      <tr  align="right" style="width: 300px;">
                                        <th colspan="2" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">Discount</th>
                                        <td colspan="2" align="right" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          Kr ${discountAmount.toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr  align="right" style="width: 300px;">
                                        <th colspan="2" align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">VAT</th>
                                        <td colspan="2" align="right" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 800; line-height: 24px; padding: 10px;">
                                          15% Included
                                        </td>
                                      </tr>                              
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                            TOTAL
                                        </td>
                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                           Kr ${(total /100).toFixed(2)}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    </td>
                </tr>
                 <tr>
                    <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0;">
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                <p style="font-weight: 800;">Delivery Address</p>
                                                <p>${billingAddressMetadata ? billingAddressMetadata.firstName : ''} ${billingAddressMetadata ? billingAddressMetadata.lastName : ''}<br>${billingAddressMetadata ? billingAddressMetadata.streetAddress : ''} ${billingAddressMetadata ? billingAddressMetadata.townCity : ''} ${billingAddressMetadata ? billingAddressMetadata.postcodeZIP : ''} ${billingAddressMetadata ? billingAddressMetadata.stateCounty : ''}<br>${billingAddressMetadata ? billingAddressMetadata.phone : ''}<br>${billingAddressMetadata ? billingAddressMetadata.emailAddress : ''}</p>
    
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                <p style="font-weight: 800;">Estimated Delivery Date</p>
                                                <p>${formattedEstimatedDeliveryDate}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style=" padding: 0px; background-color: #047b04;" bgcolor="#047b04">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="padding: 25px 0 15px 0;">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                          <a href="https://backend.naturensskatter.com/" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: black; text-decoration: none; border-radius: 5px; background-color: white; padding: 15px 30px; border: 1px solid #047b04; display: block;">Dashboard</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center">
                                <img src="https://naturensskatter.com/favicon.ico" width="50" height="50" style="display: block; border: 0px;"/>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                    OSLO Norway<br>
                                </p>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    
    `,
  };

  try {
    await transporter.sendMail(adminEmailOptions);
    console.log("Admin notification email sent");
  } catch (error) {
    console.error("Error sending admin notification email:", error);
  }
};

// Example usage:
// const customerEmail = "customer@example.com";
// const orderNumber = "123456";
// const total = "$100.00";
// const cartItemsMetadata = [{ name: "Product 1", price: 50.0, quantity: 2 }];
// const billingAddressMetadata = {
//   firstName: "John",
//   lastName: "Doe",
//   Other address details
// };

// sendCustomerConfirmationEmail(
//   customerEmail,
//   orderNumber,
//   total,
//   cartItemsMetadata,
//   billingAddressMetadata
// );

// sendAdminNotificationEmail(
//   orderNumber,
//   total,
//   cartItemsMetadata,
//   billingAddressMetadata
// );

module.exports = { sendCustomerConfirmationEmail, sendAdminNotificationEmail };
