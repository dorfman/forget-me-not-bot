const { Friend, User } = require('../../models');

export default async (req, res) => {
  if (req.method === 'POST') {
    let user_id = req.body.user_id;
    let user = await User.findByPk(user_id);

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
};
