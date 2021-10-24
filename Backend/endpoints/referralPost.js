const {Express} = require('express');
const postReferrals = require('../databaseInteraction/postReferrals');

/**
 * Sets up new referral endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up new referral endpoint
 */
function referralPost(app) {
    app.post('/api/new-referral', async(req, res) => {
        const referral = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            referralText: req.body.referralText,
            listingId: req.body.listingId,
            companyName: req.body.companyName,
            authorId: req.body.authorId
        }
        res.send(await postReferrals(referral));
    });
}

module.exports = referralPost;