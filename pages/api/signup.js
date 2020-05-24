const { User } = require('../../models');
const twilio = require('../../lib/twilio');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { phone } = req.body;

    if (!phone || phone.charAt(0) !== '+') {
      res.status(400).json({
        httpCode: 400,
        message: 'Must provide valid phone number including + and country code',
      });
    } else if (!req.body.name && req.body.name.length) {
      res.status(400).json({
        httpCode: 400,
        message: 'Must provide valid name',
      });
    } else {
      // insert into DB here
      User.create({ phone: phone, name: req.body.name })
        .then((response) => {
          return twilio
            .requestVerification(phone) // send verification text (twilio api call)
            .then(() => Promise.resolve(response));
        })
        .then((response) => res.json(response))
        .catch((err) => {
          res.status(409).json({
            httpCode: 409,
            message: 'User with this phone already exists',
          });
        });
    }
  } else {
    res.status(404).end();
  }
};
