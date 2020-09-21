const { User } = require('../../models');
const twilio = require('../../lib/twilio');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { phone } = req.body;
    const normalizedPhone = (phone || '').trim().length && (await twilio.lookup(phone));

    if (!normalizedPhone) {
      res.status(400).json({
        httpCode: 400,
        message: 'Must provide valid phone number including + and country code',
      });
      return;
    }

    try {
      const user = await User.create({ phone: normalizedPhone });
      await twilio.requestVerification(normalizedPhone);

      res.json(user);
    } catch (err) {
      res.status(409).json({
        httpCode: 409,
        message: 'User with this phone already exists',
      });
    }
  } else {
    res.status(404).end();
  }
};
