require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('./models/AdminUser');
const Category = require('./models/Category');
const Setting = require('./models/Setting');

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate');
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional)
    await AdminUser.deleteMany({});
    await Category.deleteMany({});
    await Setting.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new AdminUser({
      username: 'admin',
      password: 'admin123', // Will be hashed automatically
      email: 'admin@example.com',
      role: 'superadmin'
    });
    await admin.save();
    console.log('👤 Created admin user (username: admin, password: admin123)');

    // Create categories
    const categories = [
      { name: 'Residential', slug: 'residential', description: 'Residential properties' },
      { name: 'Commercial', slug: 'commercial', description: 'Commercial properties' },
      { name: 'Land', slug: 'land', description: 'Land and plots' },
    ];

    for (const cat of categories) {
      await Category.create(cat);
    }
    console.log('📁 Created categories');

    // Create settings
    const settings = [
      { key: 'siteName', value: 'Elite Estates', type: 'string' },
      { key: 'siteEmail', value: 'info@eliteestates.com', type: 'string' },
      { key: 'sitePhone', value: '+1 (234) 567-890', type: 'string' },
      { key: 'whatsappNumber', value: '+1234567890', type: 'string' },
    ];

    for (const setting of settings) {
      await Setting.create(setting);
    }
    console.log('⚙️  Created settings');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n🔐 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
