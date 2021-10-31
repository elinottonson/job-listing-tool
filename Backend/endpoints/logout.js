const {Express} = require('express');

/**
 * Sets up the logout endoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the logout endpoint
 */
function logOut(app){
  app.delete('/logout', (req) => {
    req.logOut();
  });
}

module.exports = logOut;