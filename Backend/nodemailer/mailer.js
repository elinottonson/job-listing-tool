async function mailer(nodemailer, info){

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
        let info = await transporter.sendMail({
            from: '"Test Sender" <joblistintest@gmail.com>', // sender address
            to: "uppatel@umass.edu", // list of receivers
            subject: "Hello", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log('Email Sent')
    } catch(err) {
        console.log("Sending Error: " + err.message);
    }
}
 
module.exports = mailer;