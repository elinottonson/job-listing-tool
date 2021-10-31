const {Express} = require('express');
const {PassportStatic} = require('passport');
const passport = require('passport');
const initializePassport = require('./passport-config');
const session = require('express-session');
const getUserById = require('../databaseInteraction/getUserById');

let passportIsSetup = false;
/**
 * Sets up passport authentication on the app
 * 
 * @param {Express} app The app to initialize passport on
 */
async function setupPassport(app){
  await initializePassport(
    passport,
    getUserById
  ); 
  await app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));
  await app.use(passport.initialize());
  await app.use(passport.session());
  passportIsSetup = true;
}

/**
 * Gets the passport object and returns a promise evaluating to it
 * 
 * @returns {Promise<PassportStatic>} the passport object
 */
async function getPassport(){
  const waitForPassportSetup = resolve => {
    if(passportIsSetup) resolve(passport);
    else setTimeout(() => waitForPassportSetup(resolve), 400);
  };
  return new Promise(waitForPassportSetup);
}

module.exports = {getPassport,
  setupPassport};