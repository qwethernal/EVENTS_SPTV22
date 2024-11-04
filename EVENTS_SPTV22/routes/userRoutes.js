const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

const authJWT = require('../middleware/authJWT');

router.post('/users/signup', userController.createUser);
router.post('/users/signin', userController.signin);
router.get('/users', userController.findAll);
router.get('/users/:id', userController.findOne);
router.put('/users/:id', authJWT.verifyToken, authJWT.checkUserId, userController.updateUser);
router.delete('/users/:id', authJWT.verifyToken, authJWT.checkUserId, userController.delete);
router.get('/users/username/:username', userController.findUsersByUsername);


module.exports = router;
