const doCredentialsMatch = require('../databaseInteraction/doCredentialsMatch');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Determines if the supplied email is valid
 * 
 * @param {string} email the email being checked
 * @returns {boolean} true if the email is valid, false otherwise
 */
function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email);
}

function initialize(passport, getUserById) {
    const authenticateUser = async (email, password, done) => {
        if (emailIsValid(email)) {
            console.log('Email is valid.');
            const user = await doCredentialsMatch(email, password);
            if (user) {
                console.log('Found User.');
                return done(null, user);
            } else {
                res.status(404);
                res.send({ Error: 'Invalid username and/or password' });
                return done(null, false, {message : 'Invalid username and/or password.'});
            }
        } else {
            console.log('Invalid email');
            res.status(400);
            res.send({ Error: 'Invalid email' });
            return done(null, false, {message : 'Invalid email.'});
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id);
        return done(null, user);
    });
}

module.exports = initialize;