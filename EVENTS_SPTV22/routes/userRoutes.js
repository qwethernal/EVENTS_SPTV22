const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const eventController = require('../controllers/eventController'); 
const attendanceController = require('../controllers/attendanceController'); 
const categoryController = require('../controllers/categoryController'); 

const authJWT = require('../middleware/authJWT');


router.post('/users/signup', userController.create);
router.post('/users/signin', userController.signin);
router.get('/users', userController.findAll);
router.get('/users/:id', userController.findOne);
router.put('/users/:id', authJWT.verifyToken, authJWT.checkUserId, userController.update);
router.delete('/users/:id', authJWT.verifyToken, authJWT.checkUserId, userController.delete);
router.get('/users/username/:username', userController.findUsersByUsername);


router.post('/users/:id/events', authJWT.verifyToken, authJWT.checkUserId, eventController.createEventNoUserId);
router.get('/events', eventController.findAllEvent);
router.get('/events/:id', eventController.findOneEvent);
router.get('/events/category/:categoryName', eventController.findByCategory);
router.get('/events/time/:date', eventController.findByDate);
router.put('/events/:id', authJWT.verifyToken, eventController.update);
router.delete('/events/:id', authJWT.verifyToken, eventController.delete);


router.post('/users/:id/attendances', authJWT.verifyToken, authJWT.checkUserId, attendanceController.create);
router.get('/attendance', attendanceController.findAllAttendance);
router.get('/attendance/:id', attendanceController.findOneAttendance);
router.put('/attendances/:id', authJWT.verifyToken, attendanceController.update);
router.delete('/attendances/:id', authJWT.verifyToken, attendanceController.delete);


router.post('/categories', authJWT.verifyToken, categoryController.create);
router.get('/categories', categoryController.findAll);
router.get('/categories/:id', categoryController.findOne);
router.put('/categories/:id', authJWT.verifyToken, categoryController.update);
router.delete('/categories/:id', authJWT.verifyToken, categoryController.delete);

module.exports = router;
