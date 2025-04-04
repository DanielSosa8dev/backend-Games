require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    
    const adminExists = await User.findOne({ email: 'daniel@gmail.com' });
    if (adminExists) {
      console.log('⚠️  El usuario admin ya existe');
      return process.exit(0);
    }

    const admin = await User.create({
      email: 'daniel@gmail.com',
      password: 'Admin123', // Cambia esto en producción
      role: 'admin'
    });

    console.log('✅ Usuario admin creado:', {
      email: admin.email,
      role: admin.role,
      _id: admin._id
    });
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al crear admin:', err.message);
    process.exit(1);
  }
};

createAdmin();