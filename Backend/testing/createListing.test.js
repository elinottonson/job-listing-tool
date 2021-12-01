const createListingDB = require('../databaseInteraction/createListingDB');
const { teardown } = require('./sharedMethods');
const {models} = require('../sequelizeSetup/sequalizeConstructor');

describe ('createListing testing', () => {
    const listing = {
        title: 'Job Title',
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
                    title: 'Job Title',
                    companyName: "Company Name",
                    description: "Job Description",
                    minYearsExperience: 10,
                    managerId: 70000,
                    salary: 1,
                    tags: []
                })
            );
            models.Position.destroy({
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
    });
});

afterAll(teardown);
