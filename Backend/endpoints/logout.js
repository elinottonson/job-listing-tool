const { Express } = require('express');

/**
 * Sets up the logout endoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the logout endpoint
 */
function logOutDelete(app) {
  app.delete('/logout', (req, res) => {
    console.log('we do get here');
    req.logOut()
      .then(res.status(200))
      .catch(res.status(500));
  });
}

module.exports = logOutDelete;