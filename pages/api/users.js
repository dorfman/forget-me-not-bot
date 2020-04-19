const { User } = require('../../models');

export default async (req, res) => {
  if (req.method === 'GET') {
    const users = await User.findAll();

    for (const user of users) {
      console.log(await user.getFriends());
      console.log(await user.getPrompts());
    }

    res.json(users);
  } else {
    res.status(404).end();
  }
};
