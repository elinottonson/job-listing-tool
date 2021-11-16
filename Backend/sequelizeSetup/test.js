const {models} = require ('./sequalizeConstructor')

models.Referral.findAll({raw:true}).then((res) => console.log(res))