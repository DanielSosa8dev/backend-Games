const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Public CRUD routes
router.get('/', gameController.getGames);
router.post('/', gameController.createGame);
router.get('/:id', gameController.getGameById);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;