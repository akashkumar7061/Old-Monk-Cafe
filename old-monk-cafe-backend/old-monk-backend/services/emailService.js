const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const BRAND = {
  name: 'OLD MONK CAFE',
  color: '#C49A6C',
  dark: '#1E1E1E',
};

const baseTemplate = (title, bodyHtml) => `
  <div style="font-family: Arial, sans-serif; background:#121212; padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:${BRAND.dark};border-radius:12px;overflow:hidden;">
      <div style="background:${BRAND.color};padding:20px;text-align:center;">
        <h1 style="margin:0;color:#1E1E1E;font-size:22px;letter-spacing:1px;">${BRAND.name}</h1>
      </div>
      <div style="padding:24px;color:#F5E6D3;">
        <h2 style="color:#FFFFFF;font-size:18px;">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="padding:16px;text-align:center;color:#888;font-size:12px;">
        7, Sundarpur, Darbhanga, Basdeopur, Bihar 846005 &middot; +91 92969 35757
      </div>
    </div>
  </div>
`;

/**
 * Low-level send. Never throws to the caller — email failures shouldn't
 * break the primary request (e.g. a reservation should still succeed
 * even if the confirmation email fails to send). Errors are logged instead.
 */
const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    logger.error(`Email send failed to ${to}: ${error.message}`);
    return false;
  }
};

const sendReservationConfirmation = (reservation) =>
  sendMail({
    to: reservation.email,
    subject: `Reservation ${reservation.status === 'confirmed' ? 'Confirmed' : 'Received'} - OLD MONK CAFE`,
    html: baseTemplate(
      `Hi ${reservation.name}, your table reservation is ${reservation.status}!`,
      `<p>Date: <b>${new Date(reservation.date).toLocaleDateString('en-IN')}</b></p>
       <p>Time: <b>${reservation.timeSlot}</b></p>
       <p>Guests: <b>${reservation.guests}</b></p>
       ${reservation.tableNumber ? `<p>Table: <b>${reservation.tableNumber}</b></p>` : ''}
       <p>We can't wait to host you at OLD MONK CAFE!</p>`
    ),
  });

const sendOrderConfirmation = (order) =>
  sendMail({
    to: order.user?.email || order.guestDetails?.email,
    subject: `Order Confirmed #${order.orderNumber} - OLD MONK CAFE`,
    html: baseTemplate(
      `Thanks for your order, ${order.user?.name || order.guestDetails?.name}!`,
      `<p>Order No: <b>${order.orderNumber}</b></p>
       <ul>${order.items
         .map((i) => `<li>${i.name} x${i.quantity} - ₹${i.subtotal}</li>`)
         .join('')}</ul>
       <p>Total: <b>₹${order.totalAmount}</b></p>
       <p>Status: <b>${order.status}</b></p>`
    ),
  });

const sendOrderStatusUpdate = (order) =>
  sendMail({
    to: order.user?.email || order.guestDetails?.email,
    subject: `Order #${order.orderNumber} is now ${order.status} - OLD MONK CAFE`,
    html: baseTemplate(
      `Order Update`,
      `<p>Your order <b>${order.orderNumber}</b> status changed to <b>${order.status}</b>.</p>`
    ),
  });

const sendPasswordResetEmail = (user, resetUrl) =>
  sendMail({
    to: user.email,
    subject: 'Password Reset Request - OLD MONK CAFE',
    html: baseTemplate(
      `Hi ${user.name}, reset your password`,
      `<p>Click the link below to reset your password. This link expires in 30 minutes.</p>
       <p><a href="${resetUrl}" style="color:${BRAND.color};">${resetUrl}</a></p>
       <p>If you did not request this, please ignore this email.</p>`
    ),
  });

const sendContactAcknowledgement = (contact) =>
  sendMail({
    to: contact.email,
    subject: 'We received your message - OLD MONK CAFE',
    html: baseTemplate(
      `Thanks for reaching out, ${contact.name}!`,
      `<p>We've received your message and will get back to you shortly.</p>
       <p><i>"${contact.message}"</i></p>`
    ),
  });

const notifyAdmin = (subject, message) =>
  sendMail({
    to: process.env.ADMIN_NOTIFICATION_EMAIL,
    subject: `[Admin Alert] ${subject}`,
    html: baseTemplate(subject, `<p>${message}</p>`),
  });

module.exports = {
  sendMail,
  sendReservationConfirmation,
  sendOrderConfirmation,
  sendOrderStatusUpdate,
  sendPasswordResetEmail,
  sendContactAcknowledgement,
  notifyAdmin,
};
