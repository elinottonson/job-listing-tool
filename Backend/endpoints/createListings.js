const {Express} = require('express');
const createListingDB = require('../databaseInteraction/createListingDB');

/**
 * Checks if listing is valid.
 * 
 * @param {object} listing The listing object.
 * @returns {boolean} True if listing is valid, false otherwise.
 */
function isListingValid (listing) {
  let listingValid = false;
  if (
    listing.title !== null && listing.description !== null && listing.minYearsExperience !== null && 
    listing.salary !== null && listing.tags !== null && listing.managerId !== null &&
    listing.companyName !== null
  ) {
    listingValid = Number.isInteger(listing.salary) && Number.isInteger(listing.minYearsExperience);
  }
  console.log(listingValid);
  return listingValid;
}

/**
 * Sets up new listing endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Create listing endpoint
 */
function createListing(app) {
  app.post('/api/new-listing', async(req, res) => {
    console.log(req.body);
    const listing = req.body.listing;
    const user = req.body.user;

    if (user.isManager){
      const listingObj = {
        title: listing.title,
        companyName: user.companyName,
        description: listing.description,
        minYearsExperience: listing.minYearsExperience,
        managerId: user.employeeId,
        salary: listing.salary,
        tags: listing.tags
      };
      if(isListingValid(listingObj)) {
        res.status(200);
        res.send( await createListingDB(listingObj)); 
      }
    } else if (!user.isManager){
      res.status(400);
      res.send({ Error: 'User not a manager.'});
    } else {
      res.status(400);
      res.send({ Error: 'Invalid Listing.'});
    }
  });
}

module.exports = createListing;