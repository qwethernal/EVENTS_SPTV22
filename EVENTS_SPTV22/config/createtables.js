const sequelize = require('../config/database');
const { User, Event, Attendance, Category } = require('../models');

sequelize.sync({ force: true }).then(async () => {
    console.log("База данных и таблицы созданы!");

    try {

        const user1 = await User.create({
            username: 'user1',
            email: 'user1@example.com',
            password: 'user1'

        });
        console.log("User 1 created:", user1.toJSON());

        const user2 = await User.create({
           username: 'user2',
            email: 'user2@example.com',
            password: 'user2'
        });
        console.log("User 2 created:", user2.toJSON());


        const category1 = await Category.create({
            title: 'Music'
        });
        console.log("Category 1 created:", category1.toJSON());

        const category2 = await Category.create({
            title: 'Art'
        });
        console.log("Category 2 created:", category2.toJSON());


        const event1 = await Event.create({
            title: 'Concert in the Park',
            description: 'A night of music and fun in the park.',
            location: 'City Park',
            startdate: new Date(),
            enddate: new Date(new Date().setHours(new Date().getHours() + 2)), // 2 hours later
            userId: user1.id,
            categoryID: category1.id
        });
        console.log("Event 1 created:", event1.toJSON());

        const event2 = await Event.create({
            title: 'Art Gallery Opening',
            description: 'Explore the latest art exhibits.',
            location: 'Art Center',
            startdate: new Date(),
            enddate: new Date(new Date().setHours(new Date().getHours() + 3)), // 3 hours later
            userId: user2.id,
            categoryID: category2.id
        });
        console.log("Event 2 created:", event2.toJSON());


        const attendance1 = await Attendance.create({
            attendancedate: new Date(),
            userId: user1.id,
            eventId: event1.id
        });
        console.log("Attendance 1 created:", attendance1.toJSON());

        const attendance2 = await Attendance.create({
            attendancedate: new Date(),
            userId: user2.id,
            eventId: event2.id
        });
        console.log("Attendance 2 created:", attendance2.toJSON());

    } catch (error) {
        console.error('Ошибка при создании записей:', error);
    }
}).catch(error => {
    console.error('Ошибка при создании базы данных:', error);
});
