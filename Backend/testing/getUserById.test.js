const getUserById = require('../databaseInteraction/getUserById');
const { teardown } = require('./sharedMethods');

describe('getUserById testing', () => {

  test('Invalid User Id', async () => {
    const user = await(getUserById(-1));
    expect(user).toBe(null);
  });

  test('Valid User Id', async () => {
    const user = await getUserById(5);
    expect(user.employeeId).toEqual(5);
    expect(user.companyId).toEqual(3);
  });
});

afterAll(teardown);