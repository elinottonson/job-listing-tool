module.exports = {
  /**
   * Checks whether or not a given user object contains the expected fields
   * 
   * @param {Object} user the user object
   * @returns {Boolean} whether or not the user object is valid
   */
  isValidUser(user) {
    let validUser = false;
    let userKeys = Object.keys(user);
    
    validUser = userKeys.includes('employeeId') && userKeys.includes('companyId') && 
                userKeys.includes('managerId') && userKeys.includes('isManager');

    return validUser;
  },
  /**
   * Checks whether or not a given string is a valid email address
   * 
   * @param {String} email the email being checked
   * @returns {Boolean} whether or not the email is valid
   */
  isValidEmail(email) {
    //checks to see if email or password have invalid characters such as quotations
    if (!(/^(?!.*['"]).*/.test(email)) || !(/^(?!.*['"])/.test(email))) {
      console.log(/^(?!.*['"*&^%$#!]).*/.test(email));
      console.log('Invalid Characters Entered!');
      return false;
    }
    //basic check to see if email contains an @ sign surrounded by non-empty characters
    else if (!((/\S+@\S+\.\S+/.test(email)))) {
      console.log('Invalid Email Entered!');
      return false;
    }
    else {
      return true;
    }
  }
};