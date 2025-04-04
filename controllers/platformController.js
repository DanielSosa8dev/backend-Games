const Platform = require('../models/Platform');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Obtener todas las plataformas
exports.getAllPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find().sort({ createdAt: -1 });
    sendSuccess(res, 200, 'Plataformas obtenidas', platforms);
  } catch (err) {
    sendError(res, 500, 'Error al obtener plataformas', err.message);
  }
};

// Crear nueva plataforma
exports.createPlatform = async (req, res, next) => {
  try {
    const { name, description, icon } = req.body;
    
    if (!name || !icon) {
      return sendError(res, 400, 'Nombre e ícono son requeridos');
    }

    const newPlatform = await Platform.create({ 
      name, 
      description, 
      icon 
    });

    sendSuccess(res, 201, 'Plataforma creada', newPlatform);
  } catch (err) {
    if (err.code === 11000) {
      sendError(res, 400, 'El nombre de la plataforma ya existe');
    } else {
      sendError(res, 500, 'Error al crear plataforma', err.message);
    }
  }
};

// Obtener plataforma por ID
exports.getPlatformById = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);
    
    if (!platform) {
      return sendError(res, 404, 'Plataforma no encontrada');
    }

    sendSuccess(res, 200, 'Plataforma obtenida', platform);
  } catch (err) {
    sendError(res, 500, 'Error al obtener plataforma', err.message);
  }
};

// Actualizar plataforma
exports.updatePlatform = async (req, res, next) => {
  try {
    const updatedPlatform = await Platform.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPlatform) {
      return sendError(res, 404, 'Plataforma no encontrada');
    }

    sendSuccess(res, 200, 'Plataforma actualizada', updatedPlatform);
  } catch (err) {
    if (err.code === 11000) {
      sendError(res, 400, 'El nombre de la plataforma ya existe');
    } else {
      sendError(res, 500, 'Error al actualizar plataforma', err.message);
    }
  }
};

// Eliminar plataforma
exports.deletePlatform = async (req, res, next) => {
  try {
    const deletedPlatform = await Platform.findByIdAndDelete(req.params.id);
    
    if (!deletedPlatform) {
      return sendError(res, 404, 'Plataforma no encontrada');
    }

    sendSuccess(res, 200, 'Plataforma eliminada');
  } catch (err) {
    sendError(res, 500, 'Error al eliminar plataforma', err.message);
  }
};