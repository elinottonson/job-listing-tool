const { Sequelize } = require('sequelize');
const  {PostionSchema, EmployeeSchema, ReferralSchema} = require('./schemas')



async function main(){
    try{
        // initialize connection with sql server
        const sequelize = new Sequelize(
            'postgres://root:root@0.0.0.0:5432/test_db', {logging: false})

        await sequelize.authenticate()

        // Create models for each table
        const Employee = sequelize.define('Employees', EmployeeSchema)
        const Referal = sequelize.define('Referals', ReferralSchema)
        const Position = sequelize.define('Positions', PostionSchema)

        // Define relationships
        Position.hasMany(Referal, {foreignKey: 'postingId'})
        Referal.belongsTo(Position)
        
        Employee.hasMany(Referal, {foreignKey: 'authorId'})
        Referal.belongsTo(Employee)

        Employee.hasMany(Position, {as: 'postings', foreignKey: 'managerId'})
        Position.belongsTo(Employee, {as: 'manager'})

        Employee.hasMany(Employee,  {as: 'team', foreignKey: 'managerId'})
        Employee.belongsTo(Employee, {as: 'manager'})

        await sequelize.sync({force:true})

        Gordon = await Employee.create({
            "firstName" : "Gordon",
        })
        
        Eli = await Employee.create({
            "firstName" : "Eli",
            "managerId" : Gordon.id
        })

        CoolJob = await Position.create({
            "title" : "Database engineer",
            "managerId": Gordon.id
          })

        await Referal.bulkCreate([
            {authorId: Eli.id, postingId: CoolJob.id, fname: "Ayush" },
            {authorId: Eli.id, postingId: CoolJob.id, fname: "Xinmeng" },
            {authorId: Gordon.id, postingId: CoolJob.id, fname: "Uday" },
            {authorId: Gordon.id, postingId: CoolJob.id, fname: "Kobi" },
            
        ])

        // Getting all referals of a given job
        console.log("\nGetting all referals of a given job:\n")
        result = await CoolJob.getReferals({raw: true, attributes: ['fname']})
        console.log(result)

        // Getting the hiring manager of a given job
        result = await CoolJob.getManager({raw: true, attributes: ['firstName']})

        // Getting all referals of a given employee
        console.log("\nGetting all referals of a given employee:\n")
        result = await Eli.getReferals({raw: true, attributes: ['fname']})
        console.log(result)

        // Getting all job postings of a given hiring manager
        console.log("\nGetting all job postings of a given hiring manager:\n")
        result = await Gordon.getPostings({raw: true, attributes: ['title']})
        console.log(result)

        // Getting the manager of a given employee
        console.log("\nGetting the manager of a given employee:\n")
        result = await Eli.getManager({raw: true, attributes: ['firstName']})
        console.log(result)

        // Getting the team of a given manager
        console.log("\nGetting the team of a given manager:\n")
        result = await Gordon.getTeam({raw: true, attributes: ['firstName']})
        console.log(result)
    }
    catch(e){
        console.error(e)
    }
}

main()