const getReferrals = require('../databaseInteraction/getReferrals');
const { teardown } = require('./sharedMethods');

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

afterAll(teardown);
