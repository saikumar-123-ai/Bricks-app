require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/User');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing users
    await User.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@smartbrick.com',
        password: hashedPassword,
        role: 'Admin',
      },
      {
        name: 'Manager User',
        email: 'manager@smartbrick.com',
        password: hashedPassword,
        role: 'Manager',
      },
      {
        name: 'Worker User',
        email: 'worker@smartbrick.com',
        password: hashedPassword,
        role: 'Worker',
      },
      {
        name: 'Customer User',
        email: 'customer@smartbrick.com',
        password: hashedPassword,
        role: 'Customer',
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedUsers();
