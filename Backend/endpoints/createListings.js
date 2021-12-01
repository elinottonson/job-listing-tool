const {Express} = require('express');
const createListingDB = require('../databaseInteraction/createListingDB');

/**
 * Determines if parameter is integer.
 * 
 * @param {integer} posNum Expected integer value.
 * @returns {boolean} true if posNum is an integer, false otherwise.
 */
function isInteger(posNum){
    return Number.isInteger(posNum);
}

/**
 * Checks if listing is valid.
 * 
 * @param {object} req The request sent to backend.
 * @returns {boolean} True if listing is valid, false otherwise.
 */
function isListingValid (req) {
    var listingValid = false;
    if (req.body.title != null && req.body.description != null && req.body.minYearsExperience != null && req.body.salary != null && req.body.tags != null) {
        listingValid = isInteger(req.body.salary) && isInteger(req.body.minYearsExperience);
    }
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
        if (isListingValid(req) && req.user.isManager){
            const listing = {
                title: req.body.title,
                companyName: req.user.companyName,
                description: req.body.description,
                minYearsExperience: req.body.minYearsExperience,
                managerId: req.user.managerId,
                salary: req.body.salary,
                tags: req.body.tags
            }
            res.status(200);
            res.send( await createListingDB(listing));
        } else {
            res.status(400);
            res.send({ Error: 'Invalid listing.'})
        }
    });
}

module.exports = createListing;