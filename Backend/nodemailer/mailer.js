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
        `${ref.firstName} ${ref.lastName} been referred for position ${listing.title}.\n\n` + 
        `Referral Description: \n${ref.referralText}\n\n` + 
        `Referee Email: ${ref.email}`;

        await transporter.sendMail({
            from: '"no-reply" <joblistintest@gmail.com>', // sender address
            to: rec.email, // list of receivers
            subject: "Job Referral", // Subject line
            text: text, // plain text body
        });
        console.log('Email Sent to ' + rec.email);
    } catch(err) {
        console.log("Sending Error: " + err.message);
    }
}
 
module.exports = mailer;