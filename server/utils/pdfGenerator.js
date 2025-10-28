const PDFDocument = require('pdfkit');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

const generateEnquiryPDF = async (enquiry) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const fileName = `enquiry_${enquiry._id}_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '../temp', fileName);

      // Ensure temp directory exists
      fs.ensureDirSync(path.join(__dirname, '../temp'));

      // Pipe PDF to file
      const stream = doc.pipe(fs.createWriteStream(filePath));

      // Add content to PDF
      doc.fontSize(20).text('Property Enquiry Details', { align: 'center' });
      doc.moveDown();

      // Add logo or header image if available
      // doc.image('path/to/logo.png', 50, 50, { width: 100 });

      // Enquiry details
      doc.fontSize(14).text('Customer Information');
      doc.moveDown(0.5);
      doc.fontSize(12).text(`Name: ${enquiry.name}`);
      doc.text(`Phone: ${enquiry.phone}`);
      doc.text(`Email: ${enquiry.email || 'Not provided'}`);
      doc.text(`Address: ${enquiry.address || 'Not provided'}`);
      doc.moveDown();

      // Property details
      if (enquiry.property) {
        doc.fontSize(14).text('Property Information');
        doc.moveDown(0.5);
        doc.fontSize(12).text(`Property: ${enquiry.property.title}`);
        doc.text(`Location: ${enquiry.property.location}`);
        doc.text(`Price: ${enquiry.property.price}`);
      }

      doc.moveDown();
      doc.fontSize(14).text('Message');
      doc.moveDown(0.5);
      doc.fontSize(12).text(enquiry.message || 'No message provided');

      doc.moveDown();
      doc.fontSize(10).text(`Enquiry received on: ${moment(enquiry.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`);

      // Finalize PDF
      doc.end();

      stream.on('finish', () => {
        resolve(filePath);
      });

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateEnquiryPDF };