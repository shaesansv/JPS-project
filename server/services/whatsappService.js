const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');

class WhatsAppService {
  constructor() {
    this.client = new Client({
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    this.initialize();
  }

  initialize() {
    // Generate QR code for WhatsApp Web authentication
    this.client.on('qr', (qr) => {
      console.log('Scan this QR code in WhatsApp to enable WhatsApp integration:');
      qrcode.generate(qr, { small: true });
    });

    // Handle client ready state
    this.client.on('ready', () => {
      console.log('WhatsApp Client is ready!');
    });

    // Initialize the client
    this.client.initialize();
  }

  async sendPDFMessage(phoneNumber, caption, pdfPath) {
    try {
      // Format phone number (remove any non-numeric characters and add country code if needed)
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      
      // Check if file exists
      if (!fs.existsSync(pdfPath)) {
        throw new Error('PDF file not found');
      }

      // Send the PDF file
      const media = MessageMedia.fromFilePath(pdfPath);
      await this.client.sendMessage(`${formattedNumber}@c.us`, media, {
        caption: caption
      });

      // Clean up - delete the temporary PDF file
      await fs.remove(pdfPath);

      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  formatPhoneNumber(phone) {
    // Remove any non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Add country code (91 for India) if not present
    if (!cleaned.startsWith('91')) {
      cleaned = '91' + cleaned;
    }
    
    return cleaned;
  }
}

// Create a singleton instance
const whatsappService = new WhatsAppService();

module.exports = whatsappService;