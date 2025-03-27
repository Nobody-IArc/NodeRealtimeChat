const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const hashPassword = require('../middleware/hashPassword');

router.post('/register', hashPassword, register);

module.exports = router;
