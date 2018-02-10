const twilio = require("./twilio");

module.exports = function(req, res) {

    if(!req.body.phone || !req.body.basket) {
        return res.status(422).send({ error: 'Bad Input' })
    }

    // Format the phone number 
    const phone = String(req.body.phone).replace(/[^\d]/g,"");

    twilio.messages.create({
        body: `New order is received`,
        to: phone,
        from: '+441392690457'
    }, (err) => { 
        if(err) { 
            return res.status(422).send(err) 
        }

        res.send({ 
            basket: req.body.basket,
            sucess: true 
        });

    });

}