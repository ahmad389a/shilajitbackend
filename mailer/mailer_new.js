const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "naturenskatter@gmail.com",
    pass: "elldtlembxaphxfc",
  },
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
      <h2 style="text-align:center; margin-top: 5%; color:gray;" >Order Notification</h2>
      <p style="text-align:center; font-size: 18px;" >Order has been placed!</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid; padding: 10px;">Amount Paid</th>
          <th style="border: 1px solid; padding: 10px;">Date Paid</th>
          <th style="border: 1px solid; padding: 10px;">Payment Method</th>
          <th style="border: 1px solid; padding: 10px;">Order Number</th>
        </tr>
        <tr>
          <td style="border: 1px solid; padding: 10px;">${total}</td>
          <td style="border: 1px solid; padding: 10px;">Sep 12, 2023, 1:25:33 PM</td>
          <td style="border: 1px solid; padding: 10px;">CARD</td>
          <td style="border: 1px solid; padding: 10px;">${orderNumber}</td>
        </tr>
      </table>

      <h4 style="color: gray; margin-top: 20px;">Cart Items</h4>
      <table style="width: 100%; border-collapse: collapse; background-color:#F5F9FC; margin-top: 10px;">
        <tr>
          <th style="border: 1px solid; padding: 10px;">Product Name</th>
          <th style="border: 1px solid; padding: 10px;">Price</th>
          <th style="border: 1px solid; padding: 10px;">Quantity</th>
        </tr>
        ${cartItemsMetadata
          .map(
            (item) => `
            <tr>
              <td style="border: 1px solid; padding: 10px;">${item.name}</td>
              <td style="border: 1px solid; padding: 10px;">$${(item.price * 100).toFixed(2)}</td>
              <td style="border: 1px solid; padding: 10px;">${item.quantity}</td>
            </tr>
          `
          )
          .join("")}
      </table>

      <h4 style=" color:gray; margin-top: 20px;">Billing Address</h4>
      <table style="width: 100%; border-collapse: collapse; background-color:#F5F9FC; margin-top: 10px;">
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Name777777777777777</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.firstName} ${billingAddressMetadata.lastName}</td>
        </tr>
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Address:</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.streetAddress} ${billingAddressMetadata.townCity} ${billingAddressMetadata.postcodeZIP} ${billingAddressMetadata.stateCounty}</td>
        </tr>
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Contact:</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.phone}</td>
        </tr>
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Email:</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.emailAddress}</td>
        </tr>
      </table>
    </div>
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

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid; padding: 10px;">Amount Paid</th>
          <th style="border: 1px solid; padding: 10px;">Date Paid</th>
          <th style="border: 1px solid; padding: 10px;">Payment Method</th>
          <th style="border: 1px solid; padding: 10px;">Order Number</th>
        </tr>
        <tr>
          <td style="border: 1px solid; padding: 10px;">${total}</td>
          <td style="border: 1px solid; padding: 10px;">Sep 12, 2023, 1:25:33 PM</td>
          <td style="border: 1px solid; padding: 10px;"><b>CARD</td>
          <td style="border: 1px solid; padding: 10px;">${orderNumber}</td>
        </tr>
      </table>

      <h4 style="color: gray; margin-top: 20px;">Cart Items</h4>
      <table style="width: 100%; border-collapse: collapse; background-color:#F5F9FC; margin-top: 10px;">
        <tr>
          <th style="border: 1px solid; padding: 10px;">Product Name</th>
          <th style="border: 1px solid; padding: 10px;">Price</th>
          <th style="border: 1px solid; padding: 10px;">Quantity</th>
        </tr>
        ${cartItemsMetadata
          .map(
            (item) => `
            <tr>
              <td style="border: 1px solid; padding: 10px;">${item.name}</td>
              <td style="border: 1px solid; padding: 10px;">$${(item.price * 100).toFixed(2)}</td>
              <td style="border: 1px solid; padding: 10px;">${item.quantity}</td>
            </tr>
          `
          )
          .join("")}
      </table>

      <h4 style=" color:gray; margin-top: 20px;">Billing Address</h4>
      <table style="width: 100%; border-collapse: collapse; background-color:#F5F9FC; margin-top: 10px;">
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Name777777777777777</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.firstName} ${billingAddressMetadata.lastName}</td>
        </tr>
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Address:</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.streetAddress} ${billingAddressMetadata.townCity} ${billingAddressMetadata.postcodeZIP} ${billingAddressMetadata.stateCounty}</td>
        </tr>
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Contact:</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.phone}</td>
        </tr>
        <tr>
          <th style="border: 1px solid; padding: 10px; width: 50%;">Email:</th>
          <td style="border: 1px solid; padding: 10px;">${billingAddressMetadata.emailAddress}</td>
        </tr>
      </table>
    </div>
  `,
  
  };

  try {
    await transporter.sendMail(adminEmailOptions);
    console.log("Admin notification email sent");
  } catch (error) {
    console.error("Error sending admin notification email:", error);
  }
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return currentDate.toLocaleDateString('en-US', options);
  }
};

module.exports = { sendCustomerConfirmationEmail, sendAdminNotificationEmail };
