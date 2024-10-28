const { Event, User, Category } = require('../models');
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
            const { title, description, location, startDate, endDate, categoryID } = req.body;

            const userId = req.params.id;
    
            const event = await Event.create({
                title,
                description,
                location,
                startDate,
                endDate,
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
            const categoryName = req.params.categoryName;
    

            const category = await Category.findOne({ where: { title: categoryName } });
    
            if (!category) {
                return res.status(404).json({ message: 'Category not found.' });
            }
    

            const events = await Event.findAll({
                where: { categoryID: category.id },
                include: [
                    { model: User, as: 'user', attributes: ['username'] }, 
                    { model: Category, as: 'category', attributes: ['title'] } 
                ]
            });
    
            if (events.length === 0) {
                return res.status(404).json({ message: 'No events with that category.' });
            }
    
            const formattedEvents = events.map(event => ({
                title: event.title,
                description: event.description,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                username: event.user.username, 
                category: event.category.title 
            }));
    
            res.json(formattedEvents);
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
                    startDate: { 
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                },
                include: [
                    { model: User, as: 'user', attributes: ['username'] }, 
                    { model: Category, as: 'category', attributes: ['title'] } 
                ]
            });
    
            if (events.length === 0) {
                return res.status(404).json({ message: 'No events for this date.' });
            }
    
            const formattedEvents = events.map(event => ({
                title: event.title,
                description: event.description,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                username: event.user.username, 
                category: event.category.title 
            }));
    
            res.json(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json(error);
        }
    },
    findAllEvent: async (req, res) => {
        try {
            const events = await Event.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Category, as: 'category', attributes: ['title'] }
                ],
                attributes: ['title', 'description', 'location', 'startDate', 'endDate'] 
            });

            const formattedEvents = events.map(event => ({
                title: event.title,
                description: event.description,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                username: event.user.username, 
                category: event.category.title 
            }));

            res.json(formattedEvents);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    findOneEvent: async (req, res) => {
        try {
            const eventId = req.params.id;
            const event = await Event.findByPk(eventId, {
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Category, as: 'category', attributes: ['title'] }
                ],
                attributes: ['title', 'description', 'location', 'startDate', 'endDate']
            });
    
            if (!event) {
                return res.status(404).json({ message: 'Event not found.' });
            }
    
            const formattedEvent = {
                title: event.title,
                description: event.description,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                username: event.user.username,
                category: event.category.title
            };
    
            res.json(formattedEvent);
        } catch (error) {
            res.status(500).json(error);
        }
    }    
}    

module.exports = eventController;