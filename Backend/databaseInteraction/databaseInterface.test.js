const { doCredentialsMatch } = require('./databaseInterface');

afterAll(() => {return new Promise(done => {
  // Closing the DB connection allows Jest to exit successfully.
  require('../sequelizeSetup/sequalizeConstructor').close();
  done();
});});

describe('doCredentialsMatch testing', () => {
  const Email = 'Elise_Larsen@techgenix.com';
  const Password = 'larsenel';

  it('Invalid Email', () => {
    return expect(doCredentialsMatch('fake', Password)).resolves.toBe(false);
  });

  it('Invalid Password', () => {
    return expect(doCredentialsMatch(Email, 'fake')).resolves.toBe(false);
  });

  it('Correct Credentials', () => {
    return expect(doCredentialsMatch(Email, Password)).resolves.toEqual(
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