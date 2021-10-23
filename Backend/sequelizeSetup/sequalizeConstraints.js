const { Op, Sequelize } = require('sequelize');


/**
 * Provides extra room for setting up sequelize
 * 
 * @param {Sequelize} sequelize sequalize object
 */
// eslint-disable-next-line no-unused-vars
function applyExtraSetup(sequelize) {
  // Setup inter-model relations here, like foriegn keys etc.
  const {Employee, Position} = sequelize.models;
  Employee.hasMany(Position, {
      foreignKey: 'managerId',
      sourceKey: 'employeeId',
      scope: {
        [Op.and]: sequelize.where(
          sequelize.col("Employee.companyName"), '=' ,sequelize.col("listings.companyName"))
      },
      as: 'listings'

    })

  Position.hasOne(Employee,{
    foreignKey: 'employeeId',
    sourceKey: 'managerId',
    scope: {
      [Op.and]: sequelize.where(
        sequelize.col("manager.companyName"), '=' ,sequelize.col("Position.companyName"))
    },
    as: 'manager'
  })

}

module.exports = applyExtraSetup;