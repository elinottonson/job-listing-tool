/*
 * Determines if a given listing matches the structure expected as well as optional checks
 * 
 * @param {object} listing The listing being checked
 * @param {object} options Optional parameter to specify additional requirements for the listing
 */
function listingMatch(listing, options = {}) {
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
  for (const tag of listing.tags) {
    expect(tag).toEqual(expect.any(String));
  }
}

/**
 * Method to close database after all the tests have run
 */
function teardown() {
  return new Promise(done => {
    // Closing the DB connection allows Jest to exit successfully.
    require('../sequelizeSetup/sequalizeConstructor').close();
    done();
  });
}


module.exports = {
  listingMatch,
  teardown,
};