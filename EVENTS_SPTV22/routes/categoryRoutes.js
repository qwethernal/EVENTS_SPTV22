const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); 

const authJWT = require('../middleware/authJWT');



router.post('/categories', authJWT.verifyToken, categoryController.createCategory);
router.get('/categories', categoryController.findAll);
router.get('/categories/:id', categoryController.findOne);
router.put('/categories/:id', authJWT.verifyToken, categoryController.updateCategory);
router.delete('/categories/:id', authJWT.verifyToken, categoryController.delete);

module.exports = router;
