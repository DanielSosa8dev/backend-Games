
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Registro de usuario
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    sendSuccess(res, 201, 'Usuario registrado exitosamente', { userId: user._id });
  } catch (err) {
    next(err);
  }
};

// Login de usuario
exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return sendError(res, 401, 'Credenciales inválidas');
      }
  
      // En tu función de login (authController.js)
const token = jwt.sign(
  { 
    id: user._id,
    role: user.role  // ¡Este campo es crítico!
  }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1h' }
);
      sendSuccess(res, 200, 'Login exitoso', { token });
    } catch (err) {
      next(err);
    }
  };