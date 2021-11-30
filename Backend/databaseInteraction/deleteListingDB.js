const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Delete a listing and referrals associated with it.
 *
 * @param {object} listingId The ID of the listing you want to delete
 * @returns {Promise<models.Referral>} An instance of the listing model
 * 
 */

function deleteListingDB(positionId) {
    models.Referral.findAll({
        where: {
            listingId: positionId
        }
    }).then(function (result) {
        const ids = [];
        for (const entry of result) {
            ids.push(entry.id)
        }
        models.Referral.destroy({
            where: {
                id: ids
            }
        })
    });
    models.Position.findAll({
        where: {
            id: positionId
        }
    }).then(function (results) {
        const ids = [];
        for (const entry of results) {
            ids.push(entry.id)
        }
        return models.Position.destroy({
            where: {
                id: ids
            }
        })
    });
}

module.exports = deleteListingDB;