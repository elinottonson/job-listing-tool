const {Express} = require('express');
const { checkAuth } = require('../passport/checkAuth');

/**
 * Test Dash Endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the test endpoint
 */
function reAuth(app) {
  app.get('/auth', checkAuth, (req, res) => {
    const user = req.user;
    res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId,
      email: user.email,
      companyId: user.companyId,
      companyName: user.companyName,
      managerId: user.managerId,
      positionTitle: user.positionTitle,
      startDate: user.startDate,
      isManager: user.isManager,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  });
}

module.exports = reAuth;