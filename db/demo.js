// demo to connect the Sequelize

const { Sequelize, Op } = require('sequelize');
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
    await sequelize.authenticate()
    console.log("\nConnected with SQL server! ⚡\n")
    console.log("\nFinding one Software Engineer I position\n")

    result = await Position.findOne({
            where: {
                title:'Software Engineer I'
            },
            raw: true

        })
    console.log(result)
    console.log("\nFinding all positions with salary less than 70,000 or exactly 100,000\n")
    result = await Position.findAll({
            where: {
                salary:
{                [Op.or]: {
                    [Op.lt]: 70000,
                    [Op.eq]: 100000
                }}
            },
            raw: true
        })

    console.log(result)
    await sequelize.close()
}
    

main()