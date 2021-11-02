const express = require('express');
const path = require('path');
const app = express();

const flash = require('express-flash'); 
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Initializes Passport
const initializePassport = require('./passport/passport-config');
const getUserById = require('./databaseInteraction/getUserById');
initializePassport(
  passport,
  getUserById
); 

//For if a port is supplied as an enviroment variable
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const endpoints = [
  require('./endpoints/testGet'),
  require('./endpoints/getUser'),
  require('./endpoints/logout'),
  require('./endpoints/listingsPost'),
  require('./endpoints/referralsFromListingGet'),
  require('./endpoints/referralPost'),
  require('./endpoints/listingFromlistingIdGet')
];

for(const endpoint of endpoints){
  endpoint(app);
}

require('./endpoints/loginPost')(app, passport);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});