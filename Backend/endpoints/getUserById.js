const {Express} = require('express');
const getUserById = require('../databaseInteraction/getUserById');

/**
 * Test Dash Endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the test endpoint
 */
function getUser(app) {
  app.get('/api/user/:userId', async(req, res) => {
    const userId = req.params.userId;
    console.log(userId);

    const user = await getUserById(userId);

    console.log(user);

    if(!user) {
      res.status(404);
    }
    else {
      res.status(200);
      res.send({
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId,
        companyId: user.companyId,
        companyName: user.companyName,
        managerId: user.managerId,
        positionTitle: user.positionTitle,
        startDate: user.startDate,
        isManager: user.isManager
      });
    }
  });
}

module.exports = getUser;