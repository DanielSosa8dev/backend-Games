const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platformController');

// Public CRUD routes
router.get('/', platformController.getAllPlatforms);
router.post('/', platformController.createPlatform);
router.get('/:id', platformController.getPlatformById);
router.put('/:id', platformController.updatePlatform);
router.delete('/:id', platformController.deletePlatform);

module.exports = router;