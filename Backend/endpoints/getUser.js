const {Express} = require('express');
const { checkAuth } = require('../passport/checkAuth');

/**
 * Test Dash Endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the test endpoint
 */
function getUser(app) {
  app.get('/auth', checkAuth, (req, res) => {
    res.send(req.user);
  });
}

module.exports = getUser;