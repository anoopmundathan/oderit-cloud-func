const admin = require("firebase-admin");

module.exports = function(req, res) {

  // Verify user provided phone
  if(!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' })
  }

  // Format the phone number 
  const phone = String(req.body.phone).replace(/[^\d]/g,"");

  // Create New User and return
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }))

}
