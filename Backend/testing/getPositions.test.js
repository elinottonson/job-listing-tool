const getPositions = require('../databaseInteraction/getPositions');

const { listingMatch, teardown } = require('./sharedMethods');

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

afterAll(teardown);
