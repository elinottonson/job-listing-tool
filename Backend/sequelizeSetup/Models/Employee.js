const { DataTypes } = require('sequelize');

const EmployeeSchema = {
  firstName : {
    type: DataTypes.STRING,
  },
  lastName : {
    type: DataTypes.STRING,
  },
  employeeId : {
    type: DataTypes.INTEGER,
  },
  email : {
    type: DataTypes.STRING,
  },
  companyId : {
    type: DataTypes.INTEGER,
  },
  companyName: {
    type: DataTypes.STRING,
  },
  managerId: {
    type: DataTypes.INTEGER,
  },
  positionTitle : {
    type: DataTypes.STRING,
  },
  startDate : {
    type: DataTypes.STRING,
  },
  isManager : {
    type: DataTypes.BOOLEAN,
  },
  password : {
    type: DataTypes.STRING,
  },
};

module.exports = ['Employee',EmployeeSchema];