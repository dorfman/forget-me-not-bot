const { User } = require('../../models');
const twilio = require('../../lib/twilio');
const { withIronSession } = require('next-iron-session');

async function handler(req, res) {
  if (req.method === 'POST') {
    const { phone, code } = req.body;

    try {
      // verify the code
      await twilio.verify(phone, code);

      // verify the user
      await User.update(
        { verified_at: new Date().toISOString() },
        { where: { phone } }
      )

      // Log the user in
      req.session.set('user', { phone });
      await req.session.save();
      res.status(200).end();
    } catch (error) {
      res.status(400).json({
        httpCode: 400,
        message: error.message,
      });
    }
  } else {
    res.status(404).end();
  }
}

export default withIronSession(handler, {
  cookieName: '__forget',
  password: process.env.SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
