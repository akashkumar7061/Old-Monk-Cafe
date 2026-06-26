const logger = require('../utils/logger');

/**
 * WhatsApp notifications via Twilio's WhatsApp Business API.
 * Twilio is used here as the most common provider; swap the client below
 * for Meta's Cloud API or Gupshup if the cafe prefers a different vendor.
 *
 * NOTE: `twilio` is not in package.json by default to keep the install lean —
 * run `npm install twilio` and uncomment the client below to activate this.
 */
let twilioClient = null;
try {
  // Lazily required so the app still boots if the package isn't installed yet.
  const twilio = require('twilio');
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
} catch {
  logger.warn('Twilio SDK not installed — WhatsApp notifications are disabled (npm i twilio)');
}

const sendWhatsApp = async (to, body) => {
  if (!twilioClient) {
    logger.warn(`WhatsApp not sent (client not configured): ${body}`);
    return false;
  }
  try {
    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to,
      body,
    });
    return true;
  } catch (error) {
    logger.error(`WhatsApp send failed: ${error.message}`);
    return false;
  }
};

const notifyAdminNewReservation = (reservation) =>
  sendWhatsApp(
    process.env.CAFE_WHATSAPP_NUMBER,
    `🔔 New Reservation\n${reservation.name} (${reservation.phone})\n${new Date(
      reservation.date
    ).toLocaleDateString('en-IN')} at ${reservation.timeSlot} for ${reservation.guests} guests.`
  );

const notifyAdminNewOrder = (order) =>
  sendWhatsApp(
    process.env.CAFE_WHATSAPP_NUMBER,
    `🛒 New Order #${order.orderNumber}\nTotal: ₹${order.totalAmount}\nType: ${order.orderType}`
  );

const notifyCustomerOrderUpdate = (order, customerPhone) =>
  sendWhatsApp(
    `whatsapp:+91${customerPhone}`,
    `Your OLD MONK CAFE order #${order.orderNumber} is now: ${order.status.toUpperCase()}`
  );

module.exports = { sendWhatsApp, notifyAdminNewReservation, notifyAdminNewOrder, notifyCustomerOrderUpdate };
