const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'ec2874e03eb5cb132466fdffb14b9be7-9dda225e-dd11abbc',
        domain: 'sandbox8ef3f40f7522446cb1358567c329202b.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text, cb) => {

    
const mailOptions = {
    from: email,
    to: 'enquiry@ncehr.org',
    name,
    subject,
    text
};

transporter.sendMail(mailOptions, function(err, data){
    if (err) {
        cb(err, null);
    } else {
        cb(null, data);
    }
});

}

module.exports = sendMail;
