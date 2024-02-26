const nodemailer = require('nodemailer');

/**
 * @author @Ismael
 */

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

    type: 'OAuth2',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    accessToken: process.env.MAIL_ACCESS_TOKEN
    }
});

module.exports = transporter