/**
 * Middlewear to check if user is authenticated
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function checkAuth(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}

/**
 * Middlewear to check if user is authenticated
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function checkNotAuth(req, res, next){
    if (req.isAuthenticated()) {
      return res.redirect('/auth');
    }
    next();
}

module.exports = {
    checkAuth: checkAuth,
    checkNotAuth: checkNotAuth,
};