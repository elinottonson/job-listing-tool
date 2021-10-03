const express = require('express')
const app = express()
//For if a port is supplied as an enviroment variable
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static('public'))
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}

app.post('/api/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (emailIsValid(email)) {
    res.json({ email: email, password: password });
  } else {
    res.send(null);
  }
  console.log(`Received email: ${email}, password: ${password}`);
});