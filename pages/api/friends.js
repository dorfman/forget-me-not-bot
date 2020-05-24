const { Friend, User } = require('../../models');
const { withIronSession } = require('next-iron-session');

async function handler(req, res) {
  if (req.method === 'POST') {
    const phone = req.session.get('user').phone;
    const user = await User.findOne({ phone });

    if (user) {
      let existingFriend = await Friend.findAll({
        where: { user_id: user.id, name: req.body.name },
      });

      if (
        existingFriend &&
        existingFriend.length &&
        existingFriend[0].name === req.body.name
      ) {
        return res.status(409).json({
          httpCode: 409,
          message: 'Friend with this name already exists',
        });
      } else {
        res.json(await Friend.create(req.body));
      }
    } else {
      res.status(404).json({
        httpCode: 404,
        message: 'User not found',
      });
    }
  } else if (req.method === 'GET') {
    res.json(await Friend.findAll());
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
