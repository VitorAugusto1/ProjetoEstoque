const express = require('express');
const router = express.Router();
const { register, login, listaUsuarios, deletarUsuario } = require('../controllers/authController');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');
const { autenticar } = require('../middleware/auth');
const { apenasAdmin } = require('../middleware/admin');

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.get('/users', autenticar, apenasAdmin, listaUsuarios);
router.delete('/users/:id', autenticar, apenasAdmin, deletarUsuario);

module.exports = router;