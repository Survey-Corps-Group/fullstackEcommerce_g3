const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateTokenMiddleware, authorizeAdmin, authorizeUser } = require('../config/middleware');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/', authenticateTokenMiddleware, authorizeAdmin, userController.getUsers);
router.get('/:id', authenticateTokenMiddleware, authorizeUser, userController.getUserById);
router.put('/:id', authenticateTokenMiddleware, authorizeUser, userController.updateUser);
router.delete('/:id', authenticateTokenMiddleware, authorizeAdmin, userController.deleteUser);
router.post('/admin/register', userController.registerAdmin);

module.exports = router;
