const {Express} = require('express');

/**
 * Test Endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the test endpoint
 */
function testGet(app) {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
}

module.exports = testGet;
