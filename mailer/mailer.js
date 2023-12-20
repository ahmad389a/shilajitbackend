const nodemailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "naturenskatter@gmail.com",
    pass: "elldtlembxaphxfc",
  },
});
// transporter.use(
//   "compile",
//   hbs({
//     viewEngine: "express-handlebars",
//     viewPath: "./views/",
//   })
// );

const sendCustomerConfirmationEmail = async (
  customerEmail,
  orderNumber,
  cartItemsMetadata,
  billingAddressMetadata
) => {
  const customerEmailOptions = {
    from: "naturenskatter@gmail.com",
    to: customerEmail,
    subject: "Order Confirmation",
    template: "index",
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
  cartItemsMetadata,
  billingAddressMetadata
) => {
  const adminEmailOptions = {
    from: "naturenskatter@gmail.com",
    to: "naturenskatter@gmail.com",
    subject: "New Order Notification",
    html: `
        <div class="container">  
  <h2 style="text-align:center; margin-top: 5%; color:gray;" >New Order Notification</h2>
  <p style="text-align:center; font-size: 18px;" >A new order has been placed!</p>

  <div style="margin-left: 5%; display: inline-flex; margin-top: 10px;">
  <div style="width: 250px;">
      <span style="color:#A0A0A0; font-weight: 500;  display: block;">AMOUNT PAID</span></br>
      <span>$788.00</span>
    </div>
    <div style="width: 250px;">
      <span style="color: #A0A0A0; font-weight: 500;  display: block;">DATE PAID</span></br>
      <span>Sep 12, 2023, 1:25:33 PM</span>
    </div>
    <div style="width: 250px;">
      <span style="color:#A0A0A0; font-weight: 500;  display: block;">PAYMENT METHOD</span></br>
      <span><b>VISA</b>- 4242</span>
    </div>
    <div style="width: 250px;">
      <span style="color: #A0A0A0; font-weight: 500;  display: block;">ORDER NUMBER</span></br>
      <span>${orderNumber}</span>
    </div>

  </div>
 <div style="margin-left: 5%; margin-top: 10px;">
 <h4 style="color: gray; margin-top: 5px;">Cart Items</h4>
      <table style="background-color:#F5F9FC; padding: 10px; margin-left: 2%; border-radius: 5px; ">      
          <tbody>
            ${cartItemsMetadata
              .map(
                (item) => `
                <tr style="border-bottom: 1px solid; border-color:#E8E8E8;">
                   <th colspan="2" style="padding: 15px; width: 50%; font-weight:500;">Product Name</th><td style="width: 460px;">${
                     item.name
                   }</td>
                 </tr>
                  <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
                   <th colspan="2"  style="padding: 15px; width: 50%; font-weight:500;">Price</th><td style="width: 460px;">$${(
                     item.price / 100
                   ).toFixed(2)}</td>
                    </tr>
                   <tr>
                   <th colspan="2"  style="padding: 15px; width: 50%; font-weight:500;">Quantity</th><td style="width: 460px;">${
                     item.quantity
                   }</td>
                </tr>
              `
              )
              .join("")}

          </tbody>
        </table>
      </div>

      <div style="margin-left: 5%; margin-top: 10px;">
  <h4 style=" color:gray;">Billing Address</h4>
  <table style="background-color:#F5F9FC; padding: 10px; margin-left: 2%; border-radius: 5px; ">  
    <tbody>      
          <tr style="border-bottom: 1px solid; border-color:#E8E8E8;">
            <th  style="padding: 15px; width: 50%; font-weight:500;">Name</th><td style="width: 460px;">${
              billingAddressMetadata.firstName
            } ${billingAddressMetadata.lastName}</td>
            </tr>
            <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
            <th style="padding: 15px; width: 50%; font-weight:500;">Address:</th><td style="width: 460px;"> ${
              billingAddressMetadata.streetAddress
            } ${billingAddressMetadata.townCity} ${
      billingAddressMetadata.postcodeZIP
    } ${billingAddressMetadata.stateCounty}</td>
          </tr>
          <tr >
            <th style="padding: 15px; width: 50%; font-weight:500;">Contact:</th><td style="width: 460px;" >${
              billingAddressMetadata.phone
            }</td>           
            
          </tr>
          <th style="padding: 15px; width: 50%; font-weight:500;">Email:</th><td style="width: 460px;">${
            billingAddressMetadata.emailAddress
          }</td>           

       </tbody>
  </table>
        </div>
        </div>
        <!-- Include other billing details as needed -->
      `,
  };

  try {
    await transporter.sendMail(adminEmailOptions);
    console.log("Admin notification email sent");
  } catch (error) {
    console.error("Error sending admin notification email:", error);
  }
};

module.exports = { sendCustomerConfirmationEmail, sendAdminNotificationEmail };
