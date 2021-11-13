const {Express} = require('express');
const { checkNotAuth } = require('../passport/checkAuth');

/**
 * Test Endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the test endpoint
 */
function testGet(app) {
  app.get('/', checkNotAuth, (req, res) => {
    res.render('../public/index.ejs')
  });
}

module.exports = testGet;