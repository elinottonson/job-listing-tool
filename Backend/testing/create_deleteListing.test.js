const createListingDB = require('../databaseInteraction/createListingDB');
const deleteListingDB = require('../databaseInteraction/deleteListingDB');
const { teardown } = require('./sharedMethods');
const {models} = require('../sequelizeSetup/sequalizeConstructor');

describe ('createListing and deleteListing testing', () => {
    const listing = {
        title: 'Job Title (ABCDEF)',
        companyName: "Company Name",
        description: "Job Description",
        minYearsExperience: 10,
        managerId: 70000,
        salary: 1,
        tags: []
    };

    test('Create Listing then Delete it', async () => {
            const submit = await createListingDB(listing);
            expect(submit).toEqual(
                expect.objectContaining({
                    title: 'Job Title (ABCDEF)',
                    companyName: "Company Name",
                    description: "Job Description",
                    minYearsExperience: 10,
                    managerId: 70000,
                    salary: 1,
                    tags: []
                })
            );
            
            const listingId = submit.id;
            const deleteListing = await deleteListingDB(listingId);
            const expectEmpty = models.Position.findAll({
                where: {
                    title: 'Job Title',
                    companyName: "Company Name",
                    description: "Job Description",
                    minYearsExperience: 10,
                    managerId: 70000,
                    salary: 1,
                    tags: []
                }
            });

            expect(expectEmpty).toEqual(
                expect.objectContaining({})
            );
    });
});

afterAll(teardown);
