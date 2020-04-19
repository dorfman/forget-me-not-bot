const { Friend, User } = require('../../models');
const moment = require('moment');

export default async (req, res) => {
  if (req.method === 'POST') {
    let user_id = req.body.user_id;

    if (!req.body.user_id) {
      return res.status(400).json({
        httpCode: 400,
        message: 'Must provide valid user_id',
      });
    }

    console.log(user_id);
    let user = await User.findByPk(user_id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        httpCode: 404,
        message: 'User not found',
      });
    }
    console.log(user_id);
    console.log();

    let friends = await Friend.findAll({
      where: {
        user_id,
        last_notified_at: {
          gt: moment().startOf('day').format(),
        },
      },
    });

    console.log(friends);
    res.status(200).end();

    // if (user) {
    //   let existingFriend = await Friend.findAll({
    //     where: { user_id: user.id, name: req.body.name },
    //   });
    //
    //   if (
    //     existingFriend &&
    //     existingFriend.length &&
    //     existingFriend[0].name === req.body.name
    //   ) {
    //     return res.status(409).json({
    //       httpCode: 409,
    //       message: 'Friend with this name already exists',
    //     });
    //   } else {
    //     res.json(await Friend.create(req.body));
    //   }
    // } else {
    //   res.status(404).json({
    //     httpCode: 404,
    //     message: 'User not found',
    //   });
    // }
  } else {
    res.status(404).end();
  }
};
