const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = function(req, res) {
  // Verify user provided phone
  if(!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' })
  }

  // Format the phone number 
  const phone = String(req.body.phone).replace(/[^\d]/g,"");

  return admin.auth().getUser(phone)
    .then(user => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      return twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+1111111'
      })
    })
    .catch(err => {
      return res.status(422).send({ error: err })
    })

}
