const getReferrals = require('../databaseInteraction/getReferrals');
const getListings = require('../databaseInteraction/getFilteredListings');
const {Express} = require('express');

// TODO: This should be a protected route, i.e., only hiring managers should be able to access this
// Should also verify if the company of the hiring manager is the same as the company of the listing


/**
 * Gets referrals for a given listingId
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the referrals get endpoint
 */
function referralsGet(app) {
  app.get('/api/referrals/:listingId', async (req, res) => {
    if (!req.user?.isManager) {
      res.status(400)
      res.send("Error: Invalid Authorization")
      return;
    }
    const filterObj = {};
    if (isNaN(req.params.listingId)) {
      res.status(400)
      res.send("Error: Invalid ListingId")
      return;
    }
    filterObj.id = parseInt(req.params.listingId);
    if (!req.user.companyName) {
      res.status(400)
      res.send("Error: Invalid company for logged in user")
      return;
    }
    filterObj.companyName = req.user.companyName;
    const listingRes = await getListings(filterObj);
    if (listingRes.length == 0) {
      res.status(400)
      res.send("Error: No listing found")
      return;
    }
    if (listingRes.length != 1) {
      res.status(400)
      res.send("Error: Multiple Listings found")
      return;
    }
    console.log(listingRes);
    console.log(req.user);
    const listingManager = listingRes[0].manager;
    if (listingManager.employeeId == req.user.employeeId
      && listingManager.companyId == req.user.companyId) {
      res.send(await getReferrals(req.params.listingId));
      return;
    }
    res.status(400)
    res.send("Error: User is not the manager for this listing")
    return;
  });
}

module.exports = referralsGet;
