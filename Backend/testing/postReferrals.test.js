const postReferrals = require('../databaseInteraction/postReferrals');
const {models} = require('../sequelizeSetup/sequalizeConstructor');

describe('postReferrals testing', () => {
  const referral = {
    firstName: 'fname',
    lastName: 'lname',
    email: 'email@email.com',
    referralText: 'some text',
    listingId: 3,
    companyName: 'compName',
    authorId: 30
  };

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
    );
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
    });
  });
});
