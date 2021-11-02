const {Express} = require('express');
const getListings = require('../databaseInteraction/getFilteredListings');

/**
 * Gets listing for a given listingId
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up the referrals get endpoint
 */
function referralsGet(app) {
  app.get('/api/listings/', async (req, res) => {
    const filterObj = {};

    if(req.query.id){
      if(isNaN(req.query.id)){
        res.status(400);
        res.send({Error:'id was not a number'});
      }
      filterObj.id = parseInt(req.query.id);
    }

    if(req.query.company){
      filterObj.companyName = req.query.company;
    }

    console.log(filterObj);
    res.send(await getListings(filterObj));
  });
}

module.exports = referralsGet;
