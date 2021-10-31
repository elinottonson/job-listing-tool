const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Gets Listing with given constraints
 * 
 * @param {object} filterObj Filters the listings
 * @returns {Promise<Array<object>>} a promise evaluating to an array of listings that match the filterObj
 */
function getListings(filterObj) {
  return models.Position.findAll({
    raw:true,
    where:filterObj,
    include: [{
      model: models.Employee, 
      as: 'manager', 
      attributes: { exclude: ['updatedAt','createdAt'] }
    }],
    nest:true,
    attributes: { exclude: ['updatedAt','createdAt'] }
  });
}

module.exports = getListings;