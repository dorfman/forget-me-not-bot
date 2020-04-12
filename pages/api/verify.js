const { User } = require('../../models');
const twilio = require('../../lib/twilio');

export default (req, res) => {
  if (req.method === 'POST') {
    // verify the code
    return twilio
      .verify(req.body.phone, req.body.code)
      .then((response) =>
        User.update(
          { verified_at: new Date().toISOString() },
          {
            where: { phone: req.body.phone },
          }
        )
      )
      .then((response) => {
        res.status(200).end();
      })
      .catch((error) => {
        res.status(400).json({
          httpCode: 400,
          message: error.message,
        });
      });
  } else {
    res.status(404).end();
  }
};
