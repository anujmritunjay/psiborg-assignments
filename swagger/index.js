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
      url: 'https://mritunjaay.shop/api', 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./swagger/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
