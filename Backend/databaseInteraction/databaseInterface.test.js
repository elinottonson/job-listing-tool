const {models} = require('../sequelizeSetup/sequalizeConstructor');
const expectExport = require('expect');
const getUser = require('../endpoints/getUser');
const doCredentialsMatch = require('./doCredentialsMatch');
const getListings = require('./getFilteredListings');
const getPositions = require('./getPositions');
const getReferrals = require('./getReferrals');
const postReferrals = require('./postReferrals');
const getUserById = require('./getUserById');

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
    expect(res.length > 0).toBe(true);
    for(const entry of res){
      listingMatch(entry,{companyName:ValidCompany});
    }
  });
});

describe('getReferrals testing', () => {
  const ValidListingId = 51;
  const InvalidListingId = -1;

  test('Invalid Listing Id', async () => {
    expect(await getReferrals(InvalidListingId)).toEqual([]);
  });

  test('Valid Listing Id', async () => {
    const res = await getReferrals(ValidListingId);
    expect(res).toEqual(expect.any(Array));
    expect(res.length > 0).toBe(true);
    for(const entry of res){
      expect(entry).toEqual(
        expect.objectContaining({
          firstName:expect.any(String),
          lastName:expect.any(String),
          email:expect.any(String),
          referralText:expect.any(String),
          listingId:ValidListingId,
          authorId: expect.any(Number),
          companyName: expect.any(String)
        })
      );
    }
  });
});

describe('postReferrals testing', () => {
  const referral = {
    firstName: 'fname',
    lastName: 'lname',
    email: 'email@email.com',
    referralText: 'some text',
    listingId: 3,
    companyName: 'compName',
    authorId: 30
  }

  test('Create Referral then Delete it', async () => {
    const submit = await postReferrals(referral);
    expect(submit).toEqual(
      expect.objectContaining({
        firstName: 'fname',
        lastName: 'lname',
        email: 'email@email.com',
        referralText: 'some text',
        listingId: 3,
        authorId: 30,
        companyName: 'compName'
      })
    )
    models.Referral.destroy({
      where: {
        firstName: 'fname',
        lastName: 'lname',
        email: 'email@email.com',
        referralText: 'some text',
        listingId: '3',
        authorId: 30,
        companyName: 'compName'
      }
    })
  })
})

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

describe('getListings testing', () => {
  const InvalidListingId = -1;
  const ValidListingId = 52;

  test('Invalid Listing Id', async () => {
    expect(await getListings({id:InvalidListingId})).toEqual([]);
  });

  test('Valid Listing Id', async () => {
    const filterObj = {id:ValidListingId};
    const res = await getListings(filterObj);
    expect(res).toEqual(expect.any(Array));
    expect(res.length > 0).toBe(true);
    for(const entry of res){
      listingMatch(entry,filterObj);
    }
  });

  const InvalidCompanyName = 'Fake';
  const ValidCompanyName = 'Techgenix';

  test('Invalid Company Name', async () => {
    expect(await getListings({companyName:InvalidCompanyName})).toEqual([]);
  });

  test('Valid Company Name', async () => {
    const filterObj = {companyName:ValidCompanyName};
    const res = await getListings(filterObj);
    expect(res).toEqual(expect.any(Array));
    expect(res.length > 0).toBe(true);
    for(const entry of res){
      listingMatch(entry,filterObj);
    }
  });
});

/**
 * Determines if a given listing matches the structure expected as well as optional checks
 * 
 * @param {object} listing The listing being checked
 * @param {object} options Optional parameter to specify additional requirements for the listing
 */
function listingMatch(listing,options = {}){
  expect(listing).toEqual(
    expect.objectContaining({
      id: options.id ?? expect.any(Number),
      title: expect.any(String),
      companyName: options.companyName ?? expect.any(String),
      description: expect.any(String),
      minYearsExperience: expect.any(Number),
      salary: expect.any(Number),
      managerId: expect.any(Number),
      tags: expect.any(Array),
      manager: expect.objectContaining({
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
        employeeId: expect.any(Number),
        companyId: expect.any(Number),
        companyName: expect.any(String),
        positionTitle: expect.any(String),
        startDate: expect.any(String),
        isManager: true,
      })
    })
  );
  for(const tag of listing.tags){
    expect(tag).toEqual(expect.any(String));
  }
}
