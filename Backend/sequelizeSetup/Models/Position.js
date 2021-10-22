const { DataTypes } = require('sequelize');

const PostionSchema = {
  title : {
    type: DataTypes.STRING,
  },
  companyName:{
    type: DataTypes.STRING,
  },
  description : {
    type: DataTypes.STRING,
  },
  minYearsExperience : {
    type: DataTypes.INTEGER,
  },
  managerId: {
    type: DataTypes.INTEGER,
  },
  salary : {
    type: DataTypes.INTEGER,
  },
  tags : {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
};

module.exports =   ['Position',PostionSchema];