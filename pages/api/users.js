const { User } = require('../../models');

export default async (req, res) => {
  if (req.method === 'GET') {
    res.json(await User.findAll());
  } else {
    res.status(404).end();
  }
};
