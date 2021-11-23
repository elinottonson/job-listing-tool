const { Express } = require('express');
const swaggerDocument = require('../public/swagger.json');
const swaggerUi = require('swagger-ui-express');

/**
 * Adds an endpoint to view the swagger documentation
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the endpoint
 */
function addSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = addSwagger;