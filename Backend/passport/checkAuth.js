const {Express} = require('express');
/**
 * Middlewear to check if user is authenticated
 *
 * @param {Express.Request} req Request object
 * @param {Express.Response} res Response Object
 * @param {Function} next called on successful authentication
 * @returns {void} The output of next if called
 */
function checkAuth(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/**
 * Middlewear to check if user is authenticated
 *
 * @param {Express.Request} req Request object
 * @param {Express.Response} res Response Object
 * @param {Function} next called on successful authentication
 * @returns {void} the output of redirect (?) if it is called
 */
function checkNotAuth(req, res, next){
  if (req.isAuthenticated()) {
    return res.redirect('/auth');
  }
  next();
}

module.exports = {
  checkAuth,
  checkNotAuth,
};