const getUserById = require('../databaseInteraction/getUserById');
const getPosById = require('../databaseInteraction/getPosById');
const nodemailer = require('nodemailer');

async function mailer(ref){

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'joblistingtest@gmail.com',
            pass: 'joblistingtest123!'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try{
        const listing = await getPosById(ref.listingId);
        const rec = await getUserById(listing.managerId);

        let text = 
        `<p>${ref.firstName} ${ref.lastName} been referred for position ${listing.title}.</p>` + 
        `<p>Referral Description: ${ref.referralText}</p>` + 
        `<p>Referee Email: ${ref.email}</p>`;

        await transporter.sendMail({
            from: '"no-reply" <joblistintest@gmail.com>', // sender address
            to: "alenna.spiro@gmail.com", // list of receivers
            subject: "Job Referral", // Subject line
            text: text, // plain text body,
            html: text + "<p>Click <a>https://job-listing-tool-320.herokuapp.com/dashboard</a> to see the referral.</p>"
        });
        console.log('Email Sent to ' + rec.email);
    } catch(err) {
        console.log("Sending Error: " + err.message);
    }
}
 
module.exports = mailer;