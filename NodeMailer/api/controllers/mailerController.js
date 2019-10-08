'use strict';
const nodemailer = require('nodemailer');
const gmailEmail = process.env.GMAILLOGIN;
const recipient = process.env.EMAIL;
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const refreshToken = process.env.REFRESHTOKEN;

/*
remove before pushing
const gmailEmail = "emailservice2018on@gmail.com";
const recipient = "someonefromcanada38@gmail.com";
const clientId = '396375115656-3mrdnqru0bo2nf5qnr205nm7n51tb7tr.apps.googleusercontent.com';
const clientSecret = 'nSf7QoGOvm9k7ApQDEqe69wv';
const refreshToken = '1/_85Xs8M28BTiv93li0iBwUkWGfseO4Lj3ilJe67SdKA';
*/

var auth = {
  type: 'oauth2',
  user: gmailEmail,
  clientId: clientId,
  clientSecret: clientSecret,
  refreshToken: refreshToken,
}
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: auth,
});

exports.sendmail = function(req, res) {
    console.log(req.body);
    const mailOptions = {
        from: '"Birds Creek Farm Supply Mailer" <emailservice2018on@gmail.com>',
        to: recipient,
        subject: req.body.name + " has a message for you",
        text: req.body.message + '\n\nRespond to '+req.body.name+' by email at '+req.body.email,
      };

    mailTransport.sendMail(mailOptions).then(() => console.log('Message from '+req.query.name+' successfully sent')).catch((error) => console.error('There was an error while sending the email:', error));;
    res.send(req.body);
  };
  