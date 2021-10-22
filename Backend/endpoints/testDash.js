const {Express} = require('express');
const { checkAuth } = require('../passport/checkAuth');

/**
 * Test Dash Endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the test endpoint
 */
function testGet(app) {
  app.get('/dashboard', checkAuth, (req, res) => {
    user = req.user;
    res.send(user);
  });
}

module.exports = testGet;