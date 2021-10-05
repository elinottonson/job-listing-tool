const modal = require('../db/db-init.js')

/**
 * Finds a user from a given username/password
 * @param {string} email the email address of the user trying to be found
 * @param {string} password the password of the user trying to be found
 * @returns the user object, if found, otherwise false
 */
async function doCredentialsMatch(email, password) {
  const isSetup = await modal.isSetup();
  console.log('x', isSetup)
  if (!isSetup) return false;
  const employees = await modal.Employee.findAll({
    where: {
      email: email,
      password: password,
    }
  });
  if (employees.length) return employees[0];
  return false;
}

module.exports = { doCredentialsMatch }