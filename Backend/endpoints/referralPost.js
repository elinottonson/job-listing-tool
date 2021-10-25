const {Express} = require('express');
const postReferrals = require('../databaseInteraction/postReferrals');

/**
 * Determines if the supplied email is valid
 * 
 * @param {string} email the email being checked
 * @returns {boolean} true if the email is valid, false otherwise
 */
function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email);
}

/**
* Determines if string contains numbers.
* 
* @param {String} _string the string variable for first and last names
* @returns {boolean} true if no numbers, false otherwise
*/
function nameHasNumbers(_string) {
    return !(/\d/.test(_string));
}

/**
* Checks if referral is valid.
* 
* @param {object} req the request send to backend.
* @returns {boolean} true is referral is valid, false otherwise
*/
function isReferralValid (req) {
    var refValid = false;
    if (req.body.firstName != null && req.body.lastName != null && req.body.email != null && req.body.listingId != null) {
        refValid = emailIsValid(req.body.email) && nameHasNumbers(req.body.firstName) && nameHasNumbers(req.body.lastName);
    }
    return refValid;
}

/**
 * Sets up new referral endpoint
 * 
 * @param {Express} app The express instance to setup the endpoint on
 * @returns {void} Sets up new referral endpoint
 */
function referralPost(app) {
    app.post('/api/new-referral', async(req, res) => {
        if (isReferralValid(req)){
            const referral = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                referralText: req.body.referralText,
                listingId: req.body.listingId,
                companyName: req.body.companyName,
                authorId: req.body.authorId
            }
            res.status(200);
            res.send(await postReferrals(referral));
        } else {
            res.status(400);
            res.send({ Error: 'Invalid referral.' });
        }
    });
}

module.exports = referralPost;