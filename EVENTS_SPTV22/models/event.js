const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      isDate: true,
      allowNull: false,
      validate: {
          notEmpty: true,
          isValidDate(value) {
              if (!this.endDate || new Date(value) >= new Date(this.endDate)) {
                  throw new Error('Start date must be before end date.');
              }
          }
      }
  },
  endDate: {
      type: DataTypes.DATE,
      isDate: true,
      allowNull: false,
  } ,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        }
    }
}, {
    timestamps: false,
    tableName: 'events'
});

module.exports = Event;
