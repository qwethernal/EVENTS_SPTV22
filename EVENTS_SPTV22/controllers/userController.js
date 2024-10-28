const { User } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();


const userController = {
    createUser: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            const user = await User.create({
                username,
                password,
                email
            });
    
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
        findAll: async (req, res) => {
            try {
                const items = await User.findAll();
                res.status(200).json(items);
            } catch (error) {
                res.status(500).json(error);
            }
        },
        findOne: async (req, res) => {
            try {
                const item = await User.findByPk(req.params.id);
                if (!item) return res.status(404).json({ message: 'User not found' });
                res.json(item);
            } catch (error) {
                res.status(500).json(error);
            }
        },
        updateUser: async (req, res) => {
            try {
                const { username, password, email } = req.body;
        
                const [updated] = await User.update(
                    { username, password, email },
                    { where: { id: req.params.id } }
                );
        
                if (updated) {
                    const updatedUser = await User.findByPk(req.params.id);
                    res.json(updatedUser);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (error) {
                res.status(500).json(error);
            }
        },        
        delete: async (req, res) => {
            try {
                const deleted = await User.destroy({ where: { id: req.params.id } });
                if (deleted) {
                    return res.status(204).json({ message: 'User deleted' });
                }
                return res.status(404).json({ message: 'User not found' });
            } catch (error) {
                res.status(500).json(error);
            }
        },
    findUsersByUsername: async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    username: req.params.username
                }
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    signin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_WORD, { expiresIn: '1h' });
            res.json({ message: "Authentication successful", token });
        } catch (error) {
            res.status(500).json({ error: "User login failed" });
        }
    }
};



module.exports = userController;