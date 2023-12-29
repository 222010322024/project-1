const express = require('express');
const router = express.Router();
const { signInUser, signUpUser } = require('../controllers/User');

router.post('/signin', signInUser);
router.post('/signup', signUpUser);

module.exports = router;
