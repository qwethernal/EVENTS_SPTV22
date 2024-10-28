
const User = require('./user');
const Event = require('./event');
const Category = require('./category');
const Attendance = require('./attendance');


User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Event, { foreignKey: 'categoryID', as: 'events' });
Event.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });

User.hasMany(Attendance, { foreignKey: 'userId', as: 'attendances' });
Attendance.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Event.hasMany(Attendance, { foreignKey: 'eventId', as: 'attendances' });
Attendance.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

module.exports = { User, Event, Category, Attendance };
