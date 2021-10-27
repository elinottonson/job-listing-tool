const {models} = require('../sequelizeSetup/sequalizeConstructor');

/**
 * This function will search referrals in database and remove the referrals that are discovered. You must edit search criteria on line 12.
 * @returns 
 */

async function main() {
    const allRefs = models.Referral.findAll({
        raw: true,
        where:{
            firstName: "adaa"
        }
    }).then(function(result){
        const ids = []
        for (const entry of result){
            const id = entry.id
            ids.push(id)
            console.log(entry)
        }
        models.Referral.destroy({
           where: {
               id: ids
            }
        })
    })
    return;
}

main();
