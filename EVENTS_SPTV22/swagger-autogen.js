const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Events API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);