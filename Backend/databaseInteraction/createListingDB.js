const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Create a new listing
 *
 * @param {object} referral The object of the listing you want to create.
 * @returns {Promise<models.Referral>} An instance of the listing model
 * 
 */

function createListingDB(listing) {
    return models.Position.create({
        title: req.body.title,
        companyName: COMPANY,
        description: req.body.description,
        minYearsExperience: req.body.minYearsExperience,
        managerId: ID,
        salary: req.body.salary,
        tags: req.body.tags
    });
}

module.exports = createListingDB;
