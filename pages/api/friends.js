const { Friend } = require('../../models');

export default async (req, res) => {
  if (req.method === 'POST') {
    res.json(await Friend.create(req.body));
  } else if (req.method === 'GET') {
    res.json(await Friend.findAll());
  } else {
    res.status(404).end();
  }
};
