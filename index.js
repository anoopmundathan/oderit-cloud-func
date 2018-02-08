const admin = require("firebase-admin");
const functions = require('firebase-functions');
const serviceAccount = require('./service_account.json');

const createUser = require('./create_user');
const requestOneTimePassword = require('./request_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://oderit-34151.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
