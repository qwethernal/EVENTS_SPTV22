const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); 

const authJWT = require('../middleware/authJWT');


router.post('/users/:id/attendances', authJWT.verifyToken, authJWT.checkUserId, attendanceController.createAttendance);
router.get('/attendance', attendanceController.findAllAttendance);
router.get('/attendance/:id', attendanceController.findOneAttendance);
router.put('/attendances/:id', authJWT.verifyToken, attendanceController.updateAttendance);
router.delete('/attendances/:id', authJWT.verifyToken, attendanceController.delete);

module.exports = router;
