const nodemailer = require('nodemailer');
const AppError = require('./appError');

const sendEmail = async options => {
    // 1) Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        requireTLS: true,
        auth: {
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        },
        tls: {
            minVersion: 'TLSv1',
            rejectUnauthorized: false,
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
    await transporter.sendMail(mailOptions).
    catch(err=>{console.log(err); throw new AppError('Lo sentimos, hubo un error. Intente nuevamente mas tarde o comuniquese con afiliaciones.', 500)})

    return true
}

module.exports = sendEmail;

// TODO: ### mailtrap ###
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