const getReferrals = require('../databaseInteraction/getReferrals');
const {Express} = require('express');

/**
 * Gets referrals for a given listingId
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the referrals get endpoint
 */
function referralsGet(app) {
  app.get('/api/referrals/:listingId', async (req, res) => {
    const listingId = req.params.listingId;
    const x = await getReferrals(listingId);
    console.log('hi',x);
    res.send(x);
  });
}

module.exports = referralsGet;
