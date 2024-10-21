const express = require('express');

const userRoutes = require('./routes/userRoutes'); 
const requestLogger = require('./requestLogger'); 

const app = express();

app.use(requestLogger);

app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welcome, Events REST API');
});

app.use(userRoutes); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});