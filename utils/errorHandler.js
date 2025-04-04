const { sendError } = require('./apiResponse');

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Request} req - Objeto de petición HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 * @param {NextFunction} next - Función para pasar al siguiente middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.stack); // Log detallado en consola

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return sendError(res, 400, `Error de validación: ${messages.join(', ')}`);
  }

  // Error de duplicado (unique constraint)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendError(res, 409, `${field} ya está en uso`);
  }

  // Error de autenticación JWT
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'Token inválido');
  }

  // Error de token expirado
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 401, 'Token expirado');
  }

  // Errores personalizados con statusCode
  if (err.statusCode) {
    return sendError(res, err.statusCode, err.message);
  }

  // Error genérico (500)
  sendError(res, 500, 'Error interno del servidor', process.env.NODE_ENV === 'development' ? err.stack : null);
};

module.exports = errorHandler;