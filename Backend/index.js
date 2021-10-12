const express = require('express');
const app = express();

//For if a port is supplied as an enviroment variable
const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const endpoints = [
  require('./endpoints/testGet'),
  require('./endpoints/loginPost'),
  require('./endpoints/listingsPost')
];

for(const endpoint of endpoints){
  endpoint(app);
}