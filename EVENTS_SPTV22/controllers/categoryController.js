const { Category } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();


const categoryController = {
    createCategory: async (req, res) => {
        try {
            const { title, description } = req.body; 
    
            const category = await Category.create({
                title,
                description
            });
    
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    
    findAll: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    findOne: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) return res.status(404).json({ message: 'Category not found' });
            res.json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { title, description } = req.body; 
    
            const [updated] = await Category.update(
                { title, description }, 
                { where: { id: req.params.id } }
            );
    
            if (updated) {
                const updatedCategory = await Category.findByPk(req.params.id);
                res.json(updatedCategory);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    delete: async (req, res) => {
        try {
            const deleted = await Category.destroy({ where: { id: req.params.id } });
            if (deleted) {
                return res.status(204).json({ message: 'Category deleted' });
            }
            return res.status(404).json({ message: 'Category not found' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = categoryController;
