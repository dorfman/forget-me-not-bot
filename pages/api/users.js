const { User } = require('../../models');

export default async (req, res) => {
  if (req.method === 'GET') {
    // insert into DB here
    res.json(await User.findAll());
  } else {
    res.status(404).end();
  }
};
