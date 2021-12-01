const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * Gets Position by Id
 * 
 * @param {int} id id of position in db
 * @returns {Promise<object?>} a promise evaluating to the positon object, if found, otherwise null
 */
function getPosById(id) {
    ref = models.Position.findOne({
        raw:true,
        attributes: { exclude: ['id'] },
        where: {
          id: id,
        }
    });
    return ref;
}

module.exports = getPosById;