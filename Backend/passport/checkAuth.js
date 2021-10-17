function checkAuth(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}
  
function checkNotAuth(req, res, next){
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
    }
    next();
}

module.exports = {
    checkAuth: checkAuth,
    checkNotAuth: checkNotAuth,
};