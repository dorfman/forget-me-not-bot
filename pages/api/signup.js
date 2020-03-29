const { User } = require('../../models');

export default async (req, res) => {
  if (req.method === 'POST') {
    // generates random 4 character long alphanumeric string
    req.body.verification_code = 'soft';

    // insert into DB here
    User.create(req.body)
      .then((response) => res.json(response))
      .catch((err) =>
        res.status(409).json({
          httpCode: 409,
          message: 'User with this phone already exists',
        })
      );

    // send verification text (twilio api call)
  } else {
    res.status(404).end();
  }
};
