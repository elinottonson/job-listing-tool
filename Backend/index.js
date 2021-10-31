const express = require('express');
const path = require('path');
const app = express();

const flash = require('express-flash'); 
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));

//Initializes Passport


//For if a port is supplied as an enviroment variable
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(flash());
app.use(methodOverride('_method'));

const endpoints = [
  require('./passport/passportSetup').setupPassport,
  require('./endpoints/loginPost'),
  require('./endpoints/testGet'),
  require('./endpoints/getUser'),
  require('./endpoints/logout'),
  require('./endpoints/listingsPost'),
  require('./endpoints/referralsFromListingGet'),
  require('./endpoints/listingFromlistingIdGet')
];

for(const endpoint of endpoints){
  endpoint(app);
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});