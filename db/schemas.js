const { DataTypes, Sequelize } = require('sequelize');


const EmployeeSchema = {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName : {
        type: DataTypes.STRING,
        },
    lastName : {
        type: DataTypes.STRING,
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
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    managerId:{
        type: DataTypes.INTEGER,
    },
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

const ReferralSchema = {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fname: {
        type: DataTypes.STRING
    },
    lname: {
        type:DataTypes.STRING
    },
    email: {
        type:DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING,
    },
    authorId: {
        type:DataTypes.UUID
    },
    companyId: {
        type:DataTypes.INTEGER
    },
    postingId: {
        type:DataTypes.UUID
    },

}


module.exports =   {PostionSchema, EmployeeSchema, ReferralSchema}