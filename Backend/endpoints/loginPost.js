const doCredentialsMatch = require('../databaseInteraction/doCredentialsMatch');
const {Express} = require('express');

/**
 * Determines if the supplied email is valid
 * 
 * @param {string} email the email being checked
 * @returns {boolean} true if the email is valid, false otherwise
 */
function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email);
}

/**
 * Sets up the login endoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the login endpoint
 */
function loginPost(app) {
  app.post('/api/login', async (req, res) => {
    console.log('Received request:');
    console.log(req.body);

    let email = req.body.email;
    let password = req.body.password;

    if (emailIsValid(email)) {
      console.log('Email is valid.');
      const user = await doCredentialsMatch(email, password);
      if (user) {
        res.send({ user: user });
      } else {
        res.status(404);
        res.send({ Error: 'Invalid username and/or password' });
      }
    } else {
      res.status(400);
      res.send({ Error: 'Invalid email' });
    }
  });
}

module.exports = loginPost;
