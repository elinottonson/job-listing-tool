const getListings = require('../databaseInteraction/getFilteredListings');
const { listingMatch, teardown } = require('./sharedMethods');

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

afterAll(teardown);