const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Gets User by Id
 * 
 * @param {number} id id of user in db
 * @returns {Promise<object?>} a promise evaluating to the user object, if found, otherwise null
 */
function getUserById(id) {
  return models.Employee.findOne({
    raw:true,
    attributes: { exclude: ['id'] },
    where: {
      id: id,
    }
  });
}

module.exports = getUserById;