const { Friend, User } = require('../../models');
const Promise = require('bluebird');

export default async (req, res) => {
  if (req.method === 'POST') {
    let user_id = req.body.user_id;
    let user = await User.findByPk(user_id);

    if (user) {
      if (
        !req.body.friends ||
        !Array.isArray(req.body.friends) ||
        !req.body.friends.length
      ) {
        res.status(400).json({
          httpCode: 400,
          message: 'Must provide array of friends',
        });
      } else {
        return Promise.mapSeries(req.body.friends, (friend) => {
          if (friend.friend_id) {
            return Friend.update(
              { name: friend.name },
              { returning: true, where: { id: friend.friend_id, user_id } }
            );
          } else {
            return Friend.create({ name: friend.name, user_id });
          }
        }).then((response) => res.status(200).end());
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
