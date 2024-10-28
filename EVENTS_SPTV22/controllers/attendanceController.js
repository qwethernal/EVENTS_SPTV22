const { Attendance, User, Event } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();


const attendanceController = {
    createAttendance: async (req, res) => {
        try {
            const { attendancedate, userId, eventId } = req.body; 
    
            const attendance = await Attendance.create({
                attendancedate,
                userId,
                eventId
            });
    
            res.status(201).json(attendance);
        } catch (error) {
            res.status(400).json(error);
        }
    },    
    updateAttendance: async (req, res) => {
        try {
            const { attendancedate, userId, eventId } = req.body;
    
            const [updated] = await Attendance.update(
                { attendancedate, userId, eventId },
                { where: { id: req.params.id } }
            );
    
            if (updated) {
                const updatedAttendance = await Attendance.findByPk(req.params.id);
                res.json(updatedAttendance);
            } else {
                res.status(404).json({ message: 'Attendance not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },    
    delete: async (req, res) => {
        try {
            const deleted = await Attendance.destroy({ where: { id: req.params.id } });
            if (deleted) {
                return res.status(204).json({ message: 'Attendance deleted' });
            }
            return res.status(404).json({ message: 'Attendance not found' });
        } catch (error) {
            res.status(500).json(error);
        }
    },


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

            const formattedAttendance = attendanceRecords.map(attendance => ({
                attendancedate: attendance.attendancedate,
                username: attendance.user.username,
                eventTitle: attendance.event.title
            }));

            res.json(formattedAttendance);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = attendanceController;
