const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('ℹ️ Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10); // Use secure password in production

    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding admin user:', err.message);
  }
};

module.exports = seedAdminUser;
