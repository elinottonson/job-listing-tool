const { Sequelize } = require('sequelize');

// Extract database uri from environmental variables
require('dotenv').config();

let DATABASE_OPTIONS = null; 
if(process.env.ENV == 'DEV'){
  DATABASE_OPTIONS = {logging: false}
} else{
  DATABASE_OPTIONS = {  
    logging: false,
    dialect: 'postgres',
    sqlConnectionSsl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }

}
 

const DATABASE_URI = process.env.DATABASE_URI;

console.log(DATABASE_URI)
const sequelize = new Sequelize(DATABASE_URI, DATABASE_OPTIONS);

const modelDefiners = [
  require('./Models/Employee'),
  require('./Models/Position'),
  require('./Models/Referral'),
];

for (const modelDefiner of modelDefiners) {
  sequelize.define(...modelDefiner);
}

require('./sequalizeConstraints')(sequelize);

module.exports = sequelize;