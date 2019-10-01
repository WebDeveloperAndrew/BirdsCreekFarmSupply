'use strict';
module.exports = function(app) {
  var mailer = require('../controllers/mailerController');
  app.route('/mail').post(mailer.sendmail);
}