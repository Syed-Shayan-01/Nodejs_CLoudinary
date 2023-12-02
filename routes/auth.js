const express = require('express');
const { registerUser, findUser, deleteUser, updateUser } = require('../controllers/auth');
const router = express.Router();


router.post('/signup', registerUser);
router.post('/login', findUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
module.exports = router;