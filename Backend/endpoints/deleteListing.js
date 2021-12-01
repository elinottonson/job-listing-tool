const {Express} = require('express');
const deleteListingDB = require('../databaseInteraction/deleteListingDB');

function isListingIDValid (listingId) {
    return Number.isInteger(listingId)
}

/**
 * Delete listing and referrals associated with listing
 * 
 * @params {Express} app The express intance to setup the endpoint
 * @returns {void} Delete listing endpoint
 */
function deleteListing(app) {
    app.post('/api/delete-listing', async(req, res) => {
        if (isListingIDValid(req.body.listingId)){
            res.status(200)
            res.send( await deleteListingDB(req.body.listingId))
        } else {
            res.status(400)
            res.send({ Error: 'Listing ID invalid'})
        }
    });
}

module.exports = deleteListing;