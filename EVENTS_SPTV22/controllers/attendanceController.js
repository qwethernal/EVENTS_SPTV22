const { Attendance, User, Event } = require('../models');
const generateCRUDControllers = require('./generateCRUDControllers');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const attendanceCRUDControllers = generateCRUDControllers(Attendance);

const attendanceController = {
    ...attendanceCRUDControllers,

    findOneAttendance: async (req, res) => {
        try {
            const attendanceId = req.params.id;
            const attendance = await Attendance.findByPk(attendanceId, {
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Event, as: 'event', attributes: ['title'] }
                ]
            });

            if (!attendance) {
                return res.status(404).json({ message: 'Attendance record not found.' });
            }

            const formattedAttendance = {
                attendancedate: attendance.attendancedate,
                username: attendance.user.username,
                eventTitle: attendance.event.title
            };

            res.json(formattedAttendance);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    findAllAttendance: async (req, res) => {
        try {
            const attendanceRecords = await Attendance.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Event, as: 'event', attributes: ['title'] }
                ],
                attributes: ['attendancedate']
            });

            const formattedAttendance = attendanceRecords.map(record => ({
                attendancedate: record.attendancedate,
                username: record.user.username,
                eventTitle: record.event.title
            }));

            res.json(formattedAttendance);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = attendanceController;
