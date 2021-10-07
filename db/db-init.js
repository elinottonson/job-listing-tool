// WARNING: running this file resets the "Employees" and "Positions" table in the heroku db

const { Sequelize } = require('sequelize');
const  {PostionSchema, EmployeeSchema} = require('./schemas')

// get json files for raw data
const employees_birdseye = require("./raw_data/Birdseye_Entertainment-employees.json")
const employees_fuzzy = require("./raw_data/Fuzzy_Alpaca_Consulting-employees.json")
const employees_techgenix = require("./raw_data/Techgenix-employees.json")
const positions_birdseye = require("./raw_data/Birdseye_Entertainment-positions.json")
const positions_fuzzy = require("./raw_data/Fuzzy_Alpaca_Consulting-positions.json")
const positions_techgenix = require("./raw_data/Techgenix-positions.json")

// prepare data to be uploaded to postgres
const employees = [...employees_techgenix, ...employees_birdseye, ...employees_fuzzy]
const positions = [
    ...addField(positions_birdseye, "companyName", "Birdseye Entertainment"), 
    ...addField(positions_techgenix, "companyName", "Techgenix"),
    ...addField(positions_fuzzy, "companyName", "Fuzzy Alpaca Consulting")
]
 
// initialize connection with sql server
const sequelize = new Sequelize(
    'postgres://root:root@0.0.0.0:5432/test_db',
    {
        logging: false,
        dialect: 'postgres',
        sqlConnectionSsl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })

// Create models for each table
const Position = sequelize.define('Positions', PostionSchema)
const Employee = sequelize.define('Employees', EmployeeSchema)


// Connects to SQL server, inserts raw data and closes connection
async function main(){
    // try authenticating 10 times, waiting 200 ms between each retry
     sequelize.authenticate()
    .then(() => console.log("\nConnected with SQL server! ⚡\n"))
    .then(createEmployeeTable)
    .then(createPositionsTable)
    .then(() => console.log("Success, data is live now! 🚀\n"))
    .then(() => {sequelize.close()})
    .catch(console.error)
}

// Creates table for employees and uploads example data
async function createEmployeeTable(){
    return Employee.sync({ force: true })
    .then(() => Employee.bulkCreate(employees))
    .then(() => {console.log("Employee data pushed!☑️\n")})
    .catch(console.error)
}

// Creates table for positions and uploads example data
async function createPositionsTable(){
    return Position.sync({ force: true })
    .then(() => Position.bulkCreate(positions))
    .then(() => {console.log("Position data pushed! ☑️\n")})
    .catch(console.error)

}

// helper function to add a field to each object in a list of objects
function addField(l, name, value){
    return l.map(obj=> ({ ...obj, [name]: value }))
}

/**
 * Sets up the database if it isn't already setup, and returns a boolean value
 * if it is setup correctly
 * @returns true if the database was setup correctly, or was already setup, 
 * false otherwise 
 */
async function isSetup(){
    //TODO for database team
    await main();
    return true;
}

/**
 * Resets the database for testing
 * @returns A promise that evalutes to true if the database has been reset
 * successfully for test, otherwise false
 */
 async function reset(){
    //TODO for database team
    await main();
    return true;
}

/**
 * Exports to be used in the databaseInterface file, currently uses the 
 * following:
 *  isSetup: Determining if the db is setup
 *  Employee: for getting the user for login
 *  reset: reset database for testing
 */
module.exports = {isSetup,Employee,reset}