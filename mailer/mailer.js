
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'naturenskatter@gmail.com',
        pass: 'uboftznqspyvvqip'
    }
});
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
    html: `
    <div class="container">
        <h2 style="text-align:center; margin-top: 5%; color:gray;" >Naturensskatter</h2>
          <h4 style="text-align:center; color:gray;" >Order Confirmation</h4>

  <p style="text-align:center; font-size: 18px;" >Thank you for your order!</p>

             <div class="row mt-5 " style="margin-left: 5%;>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">AMOUNT PAID</span></br>
      <span>$788.00</span>
    </div>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">DATE PAID</span></br>
      <span>Sep 12, 2023, 1:25:33 PM</span>
    </div>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">PAYMENT METHOD</span></br>
      <span><b>VISA</b>- 4242</span>
    </div>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">ORDER NUMBER</span></br>
      <span>${orderNumber}</span>
    </div>


     <div class="col-md-12 col-lg-12 mt-4" style="margin-left: 5%;">
       <h5 style="color: gray; margin-top: 5px;">Cart Items</h5>
      <table style="background-color:#F5F9FC; padding: 10px; margin-left: 2%; border-radius: 5px; ">      
          <tbody>
            ${cartItemsMetadata
              .map(
                (item) => `
                <tr style="border-bottom: 1px solid; border-color:#E8E8E8;">
                   <th colspan="2" style="padding: 10px; width: 75%; font-weight:500;">Product Name</th><td>${item.name}</td>
                 </tr>
                  <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
                   <th colspan="2"  style="padding: 15px; width: 70%; font-weight:500;">Price</th><td>$${(item.price / 100).toFixed(2)}</td>
                    </tr>
                   <tr>
                   <th colspan="2"  style="padding: 15px; width: 70%; font-weight:500;">Quantity</th><td>${item.quantity}</td>
                </tr>
              `
              )
              .join("")}

          </tbody>
        </table>
      </div>

           <div class="col-md-12 col-sm-12 mt-5" style="margin-left: 5%;>
        <h4 style=" color:gray;">Billing Address</h4>
  <table style="background-color:#F5F9FC; padding: 10px; margin-left: 2%; border-radius: 5px; ">  
    <tbody>      
          <tr style="border-bottom: 1px solid; border-color:#E8E8E8;">
            <th  style="padding: 10px; width: 75%; font-weight:500;">Name</th><td colspan="2">${billingAddressMetadata.firstName} ${billingAddressMetadata.lastName}</td>
            </tr>
            <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
            <th style="padding: 15px; width: 70%; font-weight:500;">Address:</th><td colspan="2"> ${billingAddressMetadata.streetAddress} ${billingAddressMetadata.townCity} ${billingAddressMetadata.postcodeZIP} ${billingAddressMetadata.stateCounty}</td>
          </tr>
          <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
            <th style="padding: 15px; width: 70%; font-weight:500;">Contact:</th><td colspan="2" >${billingAddressMetadata.phone}</td>           
            
          </tr>
          <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
          <th style="padding: 15px; width: 70%; font-weight:500;">Email:</th><td colspan="2" >${billingAddressMetadata.emailAddress}</td>           
         </tr>
           <tr>
          <th style="padding: 15px; width: 70%; font-weight:500;">Visit our website:</th><td colspan="2"><a href="https://naturensskatter.com/">Naturensskatter</a></td>           
         </tr>
       </tbody>
  </table>
        </div>
        </div>


      <!-- Include other billing details as needed -->
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

         <div class="row mt-5 " style="margin-left: 5%;>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">AMOUNT PAID</span></br>
      <span>$788.00</span>
    </div>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">DATE PAID</span></br>
      <span>Sep 12, 2023, 1:25:33 PM</span>
    </div>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">PAYMENT METHOD</span></br>
      <span><b>VISA</b>- 4242</span>
    </div>
    <div class="col-md-3 col-lg-3">
      <span style="color: 	#A0A0A0; font-weight: 500;">ORDER NUMBER</span></br>
      <span>${orderNumber}</span>
    </div>

  </div>
 <div class="col-md-12 col-lg-12 mt-4" style="margin-left: 5%;">
       <h5 style="color: gray; margin-top: 5px;">Cart Items</h5>
      <table style="background-color:#F5F9FC; padding: 10px; margin-left: 2%; border-radius: 5px; ">      
          <tbody>
            ${cartItemsMetadata
              .map(
                (item) => `
                <tr style="border-bottom: 1px solid; border-color:#E8E8E8;">
                   <th colspan="2" style="padding: 10px; width: 75%; font-weight:500;">Product Name</th><td>${item.name}</td>
                 </tr>
                  <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
                   <th colspan="2"  style="padding: 15px; width: 70%; font-weight:500;">Price</th><td>$${(item.price / 100).toFixed(2)}</td>
                    </tr>
                   <tr>
                   <th colspan="2"  style="padding: 15px; width: 70%; font-weight:500;">Quantity</th><td>${item.quantity}</td>
                </tr>
              `
              )
              .join("")}

          </tbody>
        </table>
      </div>

        <div class="col-md-12 col-sm-12 mt-5" style="margin-left: 5%;>
        <h4 style=" color:gray;">Billing Address</h4>
  <table style="background-color:#F5F9FC; padding: 10px; margin-left: 2%; border-radius: 5px; ">  
    <tbody>      
          <tr style="border-bottom: 1px solid; border-color:#E8E8E8;">
            <th  style="padding: 10px; width: 75%; font-weight:500;">Name</th><td colspan="2">${billingAddressMetadata.firstName} ${billingAddressMetadata.lastName}</td>
            </tr>
            <tr style="border-bottom: 1px solid; border-color: #E8E8E8;">
            <th style="padding: 15px; width: 70%; font-weight:500;">Address:</th><td colspan="2"> ${billingAddressMetadata.streetAddress} ${billingAddressMetadata.townCity} ${billingAddressMetadata.postcodeZIP} ${billingAddressMetadata.stateCounty}</td>
          </tr>
          <tr >
            <th style="padding: 15px; width: 70%; font-weight:500;">Contact:</th><td colspan="2" >${billingAddressMetadata.phone}</td>           
            
          </tr>
          <th style="padding: 15px; width: 70%; font-weight:500;">Email:</th><td colspan="2" >${billingAddressMetadata.emailAddress}</td>           

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
