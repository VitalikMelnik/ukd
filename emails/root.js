const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    secure: false,
    auth: {
        user: 'scope.student.project@gmail.com',
        pass: '380660676933q'
    },
    tls: {
        rejectUnauthorized: false
    }
});



module.exports.t = transporter;