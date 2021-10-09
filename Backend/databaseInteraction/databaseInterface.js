const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Finds a user from a given username/password
 *
 * @param {string} email the email address of the user trying to be found
 * @param {string} password the password of the user trying to be found
 * @returns {boolean | object} the user object, if found, otherwise false
 */
async function doCredentialsMatch(email, password) {
  const employee = await models.Employee.findOne({
    raw:true,
    attributes: { exclude: ['password','email'] },
    where: {
      email: email,
      password: password,
    }
  });
  if (employee) return employee;
  return false;
}

module.exports = { doCredentialsMatch };