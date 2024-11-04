const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); 


const authJWT = require('../middleware/authJWT');

router.post('/users/:id/events', authJWT.verifyToken, authJWT.checkUserId, eventController.createEventNoUserId);
router.get('/events', eventController.findAllEvent);
router.get('/events/:id', eventController.findOneEvent);
router.get('/events/category/:categoryName', eventController.findByCategory);
router.get('/events/time/:date', eventController.findByDate);
router.put('/events/:id', authJWT.verifyToken, eventController.updateEvent);
router.delete('/events/:id', authJWT.verifyToken, eventController.delete);

module.exports = router;
