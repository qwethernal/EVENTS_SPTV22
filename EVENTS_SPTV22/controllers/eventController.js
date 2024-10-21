const { Event } = require('../models');
const { Op } = require('sequelize');
const generateCRUDControllers = require('./generateCRUDControllers');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const eventCRUDControllers = generateCRUDControllers(Event);

const eventController = {
    ...eventCRUDControllers, 
    createEventNoUserId: async (req, res) => {
        try {
            const { title, description, location, startdate, enddate, categoryID } = req.body;

            const userId = req.params.id;
    
            const event = await Event.create({
                title,
                description,
                location,
                startdate,
                enddate,
                userId, 
                categoryID
            });
    
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    findByCategory: async (req, res) => {
        try {
            const categoryID = req.params.categoryID;
            const events = await Event.findAll({
                where: { categoryID }
            });
    
            if (events.length === 0) {
                return res.status(404).json({ message: 'No events with that category.' });
            }
    
            res.json(events);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    findByDate: async (req, res) => {
        try {
            const date = req.params.date;
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1);

            const events = await Event.findAll({
                where: {
                    startdate: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                }
            });

    
            if (events.length === 0) {
                return res.status(404).json({ message: 'No events for this date.' });
            }
    
            res.json(events);
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json(error);
        }
    }
    
}    

module.exports = eventController;