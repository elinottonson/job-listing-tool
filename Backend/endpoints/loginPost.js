const {Express} = require('express');
const { getPassport } = require('../passport/passportSetup');

/**
 * Sets up the login endoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the login endpoint
 */
async function loginPost(app) {
  const passport = await getPassport();
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        console.log('User not found');
        res.status(401);
        return res.send(info.message);
      }
      req.logIn(user, function(err2) {
        if (err2) { return next(err2); }
        return res.send(req.user);
      });
    })(req, res, next);
  });
}

module.exports = loginPost;