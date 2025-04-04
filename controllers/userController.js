const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/apiResponse');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    sendSuccess(res, 200, 'Usuarios obtenidos', users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return sendError(res, 404, 'Usuario no encontrado');
    }
    sendSuccess(res, 200, 'Rol actualizado', user);
  } catch (err) {
    next(err);
  }
};