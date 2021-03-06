const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Gets User by Id
 * 
 * @param {int} id id of user in db
 * @returns {Promise<object?>} a promise evaluating to the user object, if found, otherwise null
 */
function getUserById(id) {
  let user = models.Employee.findOne({
    raw:true,
    attributes: { exclude: ['id'] },
    where: {
      employeeId: id
    }
  });
  return user;
}

module.exports = getUserById;