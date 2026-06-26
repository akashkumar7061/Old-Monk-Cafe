const PDFDocument = require('pdfkit');
const { uploadBufferToCloudinary } = require('../config/cloudinary');

/**
 * Generates a PDF invoice in memory and uploads it to Cloudinary (resource_type: raw
 * would be more correct for non-image files in a live system — for simplicity here
 * we stream the buffer and store the resulting URL on the Order document).
 * Returns { url, publicId }.
 */
const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', async () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);
        const result = await uploadBufferToCloudinary(pdfBuffer, 'oldmonk/invoices');
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

    // ---- Header ----
    doc.fontSize(20).fillColor('#1E1E1E').text('OLD MONK CAFE', { align: 'center' });
    doc
      .fontSize(10)
      .fillColor('#555')
      .text('7, Sundarpur, Darbhanga, Basdeopur, Bihar 846005', { align: 'center' })
      .text('+91 92969 35757', { align: 'center' })
      .moveDown(1.5);

    doc.fontSize(14).fillColor('#000').text(`Invoice: ${order.orderNumber}`);
    doc
      .fontSize(10)
      .fillColor('#555')
      .text(`Date: ${new Date(order.createdAt).toLocaleString('en-IN')}`)
      .text(`Order Type: ${order.orderType}`)
      .text(`Payment: ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})`)
      .moveDown(1);

    // ---- Customer ----
    const customerName = order.user?.name || order.guestDetails?.name || 'Guest';
    const customerPhone = order.user?.phone || order.guestDetails?.phone || '-';
    doc.fontSize(11).fillColor('#000').text(`Billed To: ${customerName} (${customerPhone})`).moveDown(1);

    // ---- Items Table ----
    const tableTop = doc.y;
    doc.fontSize(10).fillColor('#000');
    doc.text('Item', 50, tableTop);
    doc.text('Qty', 320, tableTop);
    doc.text('Price', 380, tableTop);
    doc.text('Subtotal', 460, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    let y = tableTop + 22;
    order.items.forEach((item) => {
      doc.text(item.name, 50, y);
      doc.text(String(item.quantity), 320, y);
      doc.text(`Rs.${item.price}`, 380, y);
      doc.text(`Rs.${item.subtotal}`, 460, y);
      y += 20;
    });

    doc.moveTo(50, y + 5).lineTo(550, y + 5).stroke();
    y += 15;

    const totalsLine = (label, value) => {
      doc.text(label, 380, y);
      doc.text(`Rs.${value}`, 460, y);
      y += 18;
    };

    totalsLine('Items Total', order.itemsTotal);
    if (order.taxAmount) totalsLine('Tax', order.taxAmount);
    if (order.deliveryFee) totalsLine('Delivery Fee', order.deliveryFee);
    if (order.discount) totalsLine('Discount', -order.discount);

    doc.fontSize(12).fillColor('#1E1E1E').text('Grand Total', 380, y);
    doc.text(`Rs.${order.totalAmount}`, 460, y);

    doc.moveDown(3).fontSize(9).fillColor('#888').text('Thank you for visiting OLD MONK CAFE!', {
      align: 'center',
    });

    doc.end();
  });
};

module.exports = { generateInvoice };
