const {Express} = require('express');

/**
 * Sets up the login endoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the login endpoint
 */
function loginPost(app, passport){
  app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/auth',
    failureRedirect: '/',
    failureFlash: true
  }));
}

module.exports = loginPost;