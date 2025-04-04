const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/apiResponse');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return sendError(res, 401, 'Token no proporcionado');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Asegúrate que decoded incluya { id, role }

    if (!req.user?.role) {
      return sendError(res, 403, 'Token inválido: rol no definido');
    }

    next();
  } catch (err) {
    sendError(res, 401, 'Token inválido o expirado');
  }
};

exports.authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, 'Acceso denegado: rol no autorizado');
    }
    next();
  };
};