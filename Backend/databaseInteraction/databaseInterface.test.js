const doCredentialsMatch = require('./doCredentialsMatch');
const getPositions = require('./getPositions');

afterAll(() => {return new Promise(done => {
  // Closing the DB connection allows Jest to exit successfully.
  require('../sequelizeSetup/sequalizeConstructor').close();
  done();
});});

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

describe('getPositions testing', () => {
  const ValidCompany = 'Techgenix';

  test('Invalid Company', async () => {
    expect(await getPositions('fake')).toEqual([]);
  });

  test('Valid Company', async () => {
    const res = await getPositions(ValidCompany);
    expect(res).toEqual(expect.any(Array));
    for(const entry of res){
      expect(entry).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          companyName: expect.any(String),
          description: expect.any(String),
          minYearsExperience: expect.any(Number),
          salary: expect.any(Number),
          tags: expect.any(Array),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      );
      for(const tag of entry.tags){
        expect(tag).toEqual(expect.any(String));
      }
    }
  });
});