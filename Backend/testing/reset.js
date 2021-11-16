// WARNING: running this file resets the "Employees" and "Positions" table in the local test db

const sequelize = require('../sequelizeSetup/sequalizeConstructor');

// get json files for raw data
employees_birdseye = require("../sequelizeSetup/raw_data/Birdseye_Entertainment-employees.json")
employees_fuzzy = require("../sequelizeSetup/raw_data/Fuzzy_Alpaca_Consulting-employees.json")
employees_techgenix = require("../sequelizeSetup/raw_data/Techgenix-employees.json")
positions_birdseye = require("../sequelizeSetup/raw_data/Birdseye_Entertainment-positions.json")
positions_fuzzy = require("../sequelizeSetup/raw_data/Fuzzy_Alpaca_Consulting-positions.json")
positions_techgenix = require("../sequelizeSetup/raw_data/Techgenix-positions.json")
referrals_birdseye = require("../sequelizeSetup/raw_data/Birdseye_Entertainment-Referrals")
referrals_fuzzy = require("../sequelizeSetup/raw_data//Fuzzy_Alpaca_Consulting_Referrals")
referrals_techgenix = require("../sequelizeSetup/raw_data/Techgenix_Referrals.json")

// prepare data to be uploaded to postgres
employees = [...employees_techgenix, ...employees_birdseye, ...employees_fuzzy]
positions = [
    ...addField(positions_birdseye, "companyName", "Birdseye Entertainment"), 
    ...addField(positions_techgenix, "companyName", "Techgenix"),
    ...addField(positions_fuzzy, "companyName", "Fuzzy Alpaca Consulting")
]
referrals = [...referrals_birdseye, ...referrals_fuzzy, ...referrals_techgenix]

// Connects to SQL server, inserts raw data and closes connection
async function reset(){
    
    // try authenticating 10 times, waiting 200 ms between each retry
    return await sequelize.authenticate()
    .then(() => console.log(sequelize.models))
    .then(() => console.log("\nConnected with SQL server! ⚡\n"))
    .then(createPositionsTable)
    .then(createEmployeeTable)
    .then(createReferralTable)
    .then(() => console.log("Success, data is live now! 🚀\n"))
    .then(() => {require('../sequelizeSetup/sequalizeConstraints')(sequelize);})
    .catch(console.error)
}

// Creates table for employees and uploads example data
async function createEmployeeTable(){
    return sequelize.models.Employee.sync({ force: true })
    .then(() => sequelize.models.Employee.bulkCreate(employees))
    .then(() => {console.log("Employee data pushed!☑️\n")})
    .catch(console.error)
}

// Creates table for positions and uploads example data
async function createPositionsTable(){
    return sequelize.models.Position.sync({ force: true })
    .then(() => sequelize.models.Position.bulkCreate(positions))
    .then(() => {console.log("Position data pushed! ☑️\n")})
    .catch(console.error)

}

// Creates table for referrals and uploads example data
async function createReferralTable(){
    return sequelize.models.Referral.sync({ force: true })
    .then(() => sequelize.models.Referral.bulkCreate(referrals))
    .then(() => {console.log("Referral data pushed! ☑️\n")})
    .catch(console.error)

}


// helper function to add a field to each object in a list of objects
function addField(l, name, value){
    return l.map(obj=> ({ ...obj, [name]: value }))
}
reset()
