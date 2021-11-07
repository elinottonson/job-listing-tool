const {Express} = require('express');
const mailer = require('../nodemailer/mailer');

function testMailer(app, nodemailer) {
  app.post('/mail', (req, res) => {
    const info = {}
    mailer(nodemailer, info);
  });
}

module.exports = testMailer;