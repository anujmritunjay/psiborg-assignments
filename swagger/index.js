const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PsiBorg Assignment',
    version: '1.0.0',
    description: 'This is a assignment from the PsiBorg.',
  },
  servers: [
    {
      url: 'http://localhost:4040/api', // Replace with your base URL
    },
    {
      url: 'https://mritunjaay.shop/api', // Replace with your base URL
    },
  ],
};

const options = {
  swaggerDefinition,
  // Point to all files containing Swagger annotations
  apis: ['./swagger/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
