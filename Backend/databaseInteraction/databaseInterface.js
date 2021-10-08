const {models} = require('../sequelizeSetup/sequalizeConstructor')

/**
 * Finds a user from a given username/password
 * @param {string} email the email address of the user trying to be found
 * @param {string} password the password of the user trying to be found
 * @returns the user object, if found, otherwise false
 */
async function doCredentialsMatch(email, password) {
  const employees = await models.Employee.findAll({
    attributes: { exclude: ['password','email'] },
    where: {
      email: email,
      password: password,
    }
  });
  if (employees.length) return employees[0].dataValues;
  return false;
}

module.exports = { doCredentialsMatch }