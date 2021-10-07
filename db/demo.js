// demo to connect the Sequelize

const { Sequelize } = require('sequelize');
const  {PostionSchema, EmployeeSchema} = require('./schemas')

// initialize connection with sql server
const sequelize = new Sequelize(
    'postgres://root:root@0.0.0.0:5432/test_db',
    {logging: false})

// Create models for each table
const Position = sequelize.define('Positions', PostionSchema)
const Employee = sequelize.define('Employees', EmployeeSchema)

// Connects to SQL server, inserts raw data and closes connection
// change this function to find the data
// "node db/demo.js"
async function main(){
     sequelize.authenticate()
    .then(() => console.log("\nConnected with SQL server! ⚡\n"))
    .then(() => {
        return Position.findAll({
            where: {
                title:'Software Engineer I'
            }
        })
    })
    .then(console.log)
    .then(() => {sequelize.close()})
    .catch(console.error)
}

main()