const { reset, isSetup } = require("../db/db-init");
const { doCredentialsMatch } = require("./databaseInterface");

//Runs once before all tests
//TODO fix once isSetup is implemented correctly
// beforeAll(async () => {
//   await isSetup();
// });

//Runs before each test
//TODO fix once reset is implemented correctly
// beforeEach(async () => {
//   await reset();
// });

test('doCredentialsMatch testing', async () => {
  const correctEmail = 'Elise_Larsen@techgenix.com';
  const correctPassword = 'larsenel';
  expect(!doCredentialsMatch('fake',correctPassword))
    .toBe(false);
  expect(!doCredentialsMatch(correctEmail,'fake'))
    .toBe(false);
  expect(doCredentialsMatch(correctEmail,correctPassword))
  .toHaveProperty(['Employees','dataValues','email'],correctEmail)
  .toHaveProperty(['Employees','dataValues','password'],correctPassword);
});