let nodemailer = require('nodemailer');

var EmailPasswordMap = new Map();
    
var countOfPersonsEmail = process.env.EMAIL.split(',');
var countOfPersonsAppPassword = process.env.APPLICATION_PASSWORD.split(',');

for(var i=0; i<countOfPersonsEmail.length; i++) {

    EmailPasswordMap.set(countOfPersonsEmail[i], countOfPersonsAppPassword[i]);
}

exports.sendEmail = function (email, subjectLine, slotDetails, callback) {
    let options = {
        from: String('Vaccine Checker ' + email),
        to: email,
        subject: subjectLine,
        text: 'Vaccine available. Details: \n\n' + slotDetails
    };

    let nodemailerTransporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: String(email),
            pass: String(EmailPasswordMap.get(email))
        }
    });


    nodemailerTransporter.sendMail(options, (error, info) => {
        if (error) {
            return callback(error);
        }
        callback(error, info);
    });
};
