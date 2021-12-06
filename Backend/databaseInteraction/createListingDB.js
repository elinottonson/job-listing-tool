const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Create a new listing
 *
 * @param {object} referral The object of the listing you want to create.
 * @returns {Promise<models.Referral>} An instance of the listing model
 */

function createListingDB(listing) {
    return models.Position.create({
        title: listing.title,
        companyName: listing.companyName,
        description: listing.description,
        minYearsExperience: listing.minYearsExperience,
        managerId: listing.managerId,
        salary: listing.salary,
        tags: listing.tags
    });
}

module.exports = createListingDB;
