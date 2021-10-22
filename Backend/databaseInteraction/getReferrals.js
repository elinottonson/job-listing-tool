const storedReferrals = [
  {
    firstname:'John',
    lastname:'Smith',
    email:'jsmith@company.com',
    referralText:'Hello, john would be good for this',
    listingId:1
  },
  {
    firstname:'John2',
    lastname:'Smith2',
    email:'jsmith2@company.com',
    referralText:'Hello, john2 would be good for this',
    listingId:1
  },
  {
    firstname:'John3',
    lastname:'Smith3',
    email:'jsmith3@company.com',
    referralText:'Hello, john3 would be good for this',
    listingId:2
  }
];

/**
 * Gets Referrals created for a given listing
 * 
 * @param {string} listingId The id of the listing that you want to get referrals for
 * @returns {Promise<Array>} a promise evaluating to an array containing the referral objects
 */
function getReferrals(listingId) {
  //TODO change to use sequelize to real Db when made
  return Promise.resolve(storedReferrals.filter(listing=>listing.listingId == listingId));
}

module.exports = getReferrals;