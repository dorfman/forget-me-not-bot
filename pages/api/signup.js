const { User } = require('../../models');

export default async (req, res) => {
  if (req.method === 'POST') {
    // generates random 4 character long alphanumeric string
    req.body.verification_code = 'soft';

    // insert into DB here
    res.json(await User.create(req.body));

    // send verification text (twilio api call)
  } else {
    res.status(404).end();
  }
};
