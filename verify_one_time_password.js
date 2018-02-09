const admin = require("firebase-admin");

module.exports = function(req, res) {
  
  if(!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided'});
  }

  // Format the phone number 
  const phone = String(req.body.phone).replace(/[^\d]/g,"");
  const code = parseInt(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref(`users/${phone}`);

      ref.on('value', data => {
        ref.off();
        const user = data.val();

        if(user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid'});
        }

        ref.update({ codeValid: false });

        // Create JWT and send
        admin.auth().createCustomToken(phone)
          .then(token => res.send({ token : token }));
      });
    })
    .catch(err => res.status(422).send({ error : err }));
  }
