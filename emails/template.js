const transporter = require('../emails/root');
const handlebars = require('handlebars');
const fs = require('fs');

var readHTMLFile = function (path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

var sent_email = function (type, addressee, title, password) {
    if (type === 'register') {
        readHTMLFile('emails/templates/register.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {};
            var data = {
                from: '"Scope" <scope.student.project@gmail.com>',
                to: addressee,
                subject: title,
                html: template(replacements),
            };
            transporter.t.sendMail(data, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email Sent: ' + info.response);
                }
            });
        });
    } else if (type === 'restore_password') {
        readHTMLFile('emails/templates/restore_password.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                link: password
            };
            var data = {
                from: '"Scope" <scope.student.project@gmail.com>',
                to: addressee,
                subject: title,
                html: template(replacements),
            };
            transporter.t.sendMail(data, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email Sent: ' + info.response);
                }
            });
        });
    }else if(type === 'restore_password_finish'){
        readHTMLFile('emails/templates/restore_password_finish.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                password: password
            };
            var data = {
                from: '"Scope" <scope.student.project@gmail.com>',
                to: addressee,
                subject: title,
                html: template(replacements),
            };
            transporter.t.sendMail(data, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email Sent: ' + info.response);
                }
            });
        });
    }

};

module.exports = sent_email;