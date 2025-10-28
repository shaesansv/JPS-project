const axios = require('axios');
const fs = require('fs-extra');

class WhatsAppCloudAPI {
  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.baseUrl = 'https://graph.facebook.com/v17.0';
  }

  async sendDocument(to, document, caption) {
    try {
      // First, upload the document to get an ID
      const formData = new FormData();
      formData.append('file', fs.createReadStream(document));
      formData.append('messaging_product', 'whatsapp');
      
      const uploadResponse = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/media`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            ...formData.getHeaders()
          }
        }
      );

      const mediaId = uploadResponse.data.id;

      // Then send the message with the document
      const response = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'document',
          document: {
            id: mediaId,
            caption
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async sendText(to, text) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: { body: text }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
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

module.exports = new WhatsAppCloudAPI();