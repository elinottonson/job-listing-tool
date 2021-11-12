const doCredentialsMatch = require('../databaseInteraction/doCredentialsMatch');
const { teardown } = require('./sharedMethods');

describe('doCredentialsMatch testing', () => {
  const Email = 'Elise_Larsen@techgenix.com';
  const Password = 'larsenel';

  test('Invalid Email', async () => {
    expect(await doCredentialsMatch('fake', Password)).toBe(null);
  });

  test('Invalid Password', async () => {
    expect(await doCredentialsMatch(Email, 'fake')).toBe(null);
  });

  test('Correct Credentials', async () => {
    expect(await doCredentialsMatch(Email, Password)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
        employeeId: expect.any(Number),
        companyId: expect.any(Number),
        companyName: expect.any(String),
        managerId: expect.any(Number),
        positionTitle: expect.any(String),
        startDate: expect.any(String),
        isManager: expect.any(Boolean),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }));
  });
});

afterAll(teardown);