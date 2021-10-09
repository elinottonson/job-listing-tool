const { Sequelize } = require('sequelize/types');

/**
 * Provides extra room for setting up sequelize
 * 
 * @param {Sequelize} sequelize sequalize object
 */
// eslint-disable-next-line no-unused-vars
function applyExtraSetup(sequelize) {
  // Setup inter-model relations here, like forign keys etc.
}

module.exports = applyExtraSetup;