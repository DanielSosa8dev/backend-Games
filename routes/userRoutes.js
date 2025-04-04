const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.patch('/:id/role', authenticate, authorize('admin'), userController.updateUserRole);

module.exports = router;