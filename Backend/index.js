const express = require('express');
const { doCredentialsMatch } = 
  require('./databaseInteraction/databaseInterface');
const app = express();
//For if a port is supplied as an enviroment variable
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/**
 * Determines if the supplied email is valid
 * 
 * @param {string} email the email being checked
 * @returns {boolean} true if the email is valid, false otherwise
 */
function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email);
}

app.post('/api/login', async (req, res) => {
  console.log('Received request:');
  console.log(req.body);

  let email = req.body.email;
  let password = req.body.password;

  if (emailIsValid(email)) {
    console.log('Email is valid.');
    const user = await doCredentialsMatch(email,password);
    if(user){
      res.send({ user:user });
    } else {
      res.status(400);
      res.send({Error:'Invalid username and/or password'});
    }
  } else {
    res.status(400);
    res.send({Error:'Invalid email'});
  }
});