
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
        <h1>Naturensskatter</h1>
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <h2>Order Details</h2>
      <p>Order Number: ${orderNumber}</p>
      <h3>Cart Items</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${cartItemsMetadata
            .map(
              (item) => `
              <tr>
                <td>${item.name}</td>
                <td>KR${(item.price / 100).toFixed(2)}</td>
                <td>${item.quantity}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
      <h3>Billing Address</h3>
      <p>Name: ${billingAddressMetadata.name}</p>
      <p>Address: ${billingAddressMetadata.address}</p>
      <p>Visit our website: <a href="https://naturensskatter.com/">Naturensskatter</a></p>
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
    from: "vincent.weissnat@ethereal.email",
    to: "wehax76891@searpen.com", 
    subject: "New Order Notification",
    html: `
        <h1>New Order Notification</h1>
        <p>A new order has been placed.</p>
        <h2>Order Details</h2>
        <p>Order Number: ${orderNumber}</p>
        <h3>Cart Items</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${cartItemsMetadata
              .map(
                (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>$${(item.price / 100).toFixed(2)}</td>
                  <td>${item.quantity}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <h3>Billing Address</h3>
        <p>Name: ${billingAddressMetadata.name}</p>
        <p>Address: ${billingAddressMetadata.address}</p>
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
