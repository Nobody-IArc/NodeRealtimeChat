const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

const hashPassword = require('../middleware/hashPassword');

router.post('/register', hashPassword, register);
router.post('/login', login);

module.exports = router;
