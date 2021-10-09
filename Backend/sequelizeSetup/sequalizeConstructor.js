const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://ateoqtukwcosay:518fff8bf0cb7f7b78' +
'7ee5c3d6ab708aae528a021a700b8ed17d14cbdc0ca6b2@ec2-44-199-26-122.compute-1.' +
'amazonaws.com:5432/d85nkorsu3068a',{
  logging: false,
  dialect: 'postgres',
  sqlConnectionSsl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const modelDefiners = [
  require('./Models/Employee'),
  require('./Models/Position')
];

for (const modelDefiner of modelDefiners) {
  sequelize.define(...modelDefiner);
}

require('./sequalizeConstraints')(sequelize);

module.exports = sequelize;