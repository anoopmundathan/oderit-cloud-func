const twilio = require('twilio');
const twilioLogin = require('./twilio_token.json');

const accountSid = twilioLogin.id;
const authToken = twilioLogin.token;

module.exports = new twilio.Twilio(accountSid, authToken);
