const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Finds a user from a given username/password
 *
 * @param {string} email the email address of the user trying to be found
 * @param {string} password the password of the user trying to be found
 * @returns {object?} the user object, if found, otherwise null
 */
function doCredentialsMatch(email, password) {
  return models.Employee.findOne({
    raw:true,
    attributes: { exclude: ['password','email'] },
    where: {
      email: email,
      password: password,
    }
  });
}

module.exports = { doCredentialsMatch };