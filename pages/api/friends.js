const { Friend, User } = require('../../models');
const Promise = require('bluebird');
const _ = require('lodash');

export default async (req, res) => {
  if (req.method === 'POST') {
    let user_id = req.body.user_id;
    let user = await User.findByPk(user_id);
    let names;

    if (!req.body.name) {
      res.status(400).json({
        httpCode: 400,
        message: 'Must provide name(s)',
      });
    } else {
      names =
        typeof req.body.name === 'string' ? [req.body.name] : req.body.name;

      if (names.length !== _.uniq(names).length) {
        res.status(400).json({
          httpCode: 400,
          message: `Please remove duplicate friend names`,
        });
      }
    }

    if (user) {
      let successful = [];
      let errored = [];

      Promise.mapSeries(names, async (name) => {
        let existingFriend = await Friend.findAll({
          where: { user_id: user.id, name },
        });

        if (
          existingFriend &&
          existingFriend.length &&
          existingFriend[0].name === name
        ) {
          errored.push(name);
        } else {
          successful.push(name);
        }
        return Promise.resolve();
      }).then(async (results) => {
        if (errored.length === 0) {
          res.json(
            await Friend.bulkCreate(
              _.map(successful, (item) => {
                return { user_id, name: item };
              })
            )
          );
        } else {
          res.status(400).json({
            httpCode: 400,
            message: `User already has friends named: ${JSON.stringify(
              errored
            )}`,
          });
        }
      });
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
