const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Pass new referrals to a listing
 *
 * @param {object} referral The object of the referral you want to create.
 * @returns {Promise<models.Referral>} An instance of the Referral model
 * 
 */

function postReferrals(referral) {
    return models.Referral.create({
        firstName: referral.firstName,
        lastName: referral.lastName,
        email: referral.email,
        referralText: referral.referralText,
        listingId: referral.listingId,
        companyName: referral.companyName,
        authorId: referral.authorId
    });
}

module.exports = postReferrals;

