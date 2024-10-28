const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    tableName: 'categories'
});


  module.exports = Category;