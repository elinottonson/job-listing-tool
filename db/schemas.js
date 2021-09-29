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
}

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
        salary : {
            type: DataTypes.INTEGER,
            },
        tags : {
            type: DataTypes.ARRAY(DataTypes.STRING),
            },
        }

module.exports =   {PostionSchema, EmployeeSchema}