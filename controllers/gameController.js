const Game = require('../models/Game');
const Platform = require('../models/Platform');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Obtener todos los juegos
exports.getGames = async (req, res, next) => {
  try {
    const games = await Game.find()
      .populate('platform', 'name icon')
      .sort({ createdAt: -1 });
    
    sendSuccess(res, 200, 'Juegos obtenidos', games);
  } catch (err) {
    sendError(res, 500, 'Error al obtener juegos', err.message);
  }
};

// Crear nuevo juego
exports.createGame = async (req, res, next) => {
  try {
    const { name, platform, price } = req.body;

    if (!name || !platform || !price) {
      return sendError(res, 400, 'Nombre, plataforma y precio son requeridos');
    }

    // Verificar si la plataforma existe
    const platformExists = await Platform.exists({ _id: platform });
    if (!platformExists) {
      return sendError(res, 400, 'La plataforma especificada no existe');
    }

    const newGame = await Game.create({
      name,
      platform,
      price,
      discount: req.body.discount || 0
    });

    sendSuccess(res, 201, 'Juego creado', newGame);
  } catch (err) {
    sendError(res, 500, 'Error al crear juego', err.message);
  }
};

// Obtener juego por ID
exports.getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).populate('platform', 'name icon');
    
    if (!game) {
      return sendError(res, 404, 'Juego no encontrado');
    }

    sendSuccess(res, 200, 'Juego obtenido', game);
  } catch (err) {
    sendError(res, 500, 'Error al obtener juego', err.message);
  }
};

// Actualizar juego
exports.updateGame = async (req, res, next) => {
  try {
    const { platform } = req.body;
    
    if (platform) {
      const platformExists = await Platform.exists({ _id: platform });
      if (!platformExists) {
        return sendError(res, 400, 'La plataforma especificada no existe');
      }
    }

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return sendError(res, 404, 'Juego no encontrado');
    }

    sendSuccess(res, 200, 'Juego actualizado', updatedGame);
  } catch (err) {
    sendError(res, 500, 'Error al actualizar juego', err.message);
  }
};

// Eliminar juego
exports.deleteGame = async (req, res, next) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    
    if (!deletedGame) {
      return sendError(res, 404, 'Juego no encontrado');
    }

    sendSuccess(res, 200, 'Juego eliminado');
  } catch (err) {
    sendError(res, 500, 'Error al eliminar juego', err.message);
  }
};