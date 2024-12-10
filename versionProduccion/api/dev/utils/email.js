const nodemailer = require('nodemailer');
const AppError = require('./appError');

const sendEmail = async options => {

    // 1) Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3' 
        }
    })
    // 2) Define the email options
    const mailOptions = {
        from: 'Credencial <no-responder@osssb.com.ar>',
        to: options.mail,
        subject: options.subject,
        text: options.message,
        html: options.html
    }

    // 3) Actually send the email
    try {
        await transporter.sendMail(mailOptions)
        return true 
    } catch(err) {
            console.log(err) 
            throw new AppError('Lo sentimos, hubo un error. Intente nuevamente mas tarde o comuníquese con afiliaciones.', false, 500)}
}

module.exports = sendEmail;

// TODO: ### MAILER ###
//EMAIL_USERNAME= 162c36d841ce26
// EMAIL_PASSWORD=0d7832accd074d
// EMAIL_PORT=25
// EMAIL_HOST=smtp.mailtrap.io

// TODO: ### NO-RESPONDER ###
// EMAIL_USERNAME=no-responder
// EMAIL_PASSWORD=12345
// EMAIL_PORT=25
// EMAIL_HOST=130.130.205.10

// FIXME: ## NO RESPONDER ##
// EMAIL_USERNAME=credencial@osssb.com
// EMAIL_PASSWORD=osba@0909!
// EMAIL_PORT=25
// EMAIL_HOST=osssb.com


    // 1) Create transporter
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.office365.com',
    //     port: 587,
    //     secure: false, 
    //         auth: {
    //             user: 'credencial@osssb.com.ar', 
    //             pass: 'Osba0909!' 
    //     },
    //         tls: {
    //             ciphers: 'SSLv3' 
    //     }
    // });