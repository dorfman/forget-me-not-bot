const { Friend, User, Prompt } = require('../../models');
const twilio = require('../../lib/twilio');
const _ = require('lodash');

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

    const friends = await user.getFriends();
    const prompts = await user.getPrompts();

    console.log(friends);
    console.log(prompts);

    const friendIdToName = {};
    const friendsHistogram = {};

    for (const friend of friends) {
      friendIdToName[friend.get('id')] = friend.get('name');
      friendsHistogram[friend.get('id')] = 0;
    }

    for (const prompt of prompts) {
      friendsHistogram[prompt.get('friendId')] += 1;
    }

    console.log(friendsHistogram);

    const leastContacted = _.min(Object.values(friendsHistogram));
    const leastContactedFriends = Object.entries(friendsHistogram)
                                        .filter((record) => record[1] === leastContacted)
                                        .map((record) => record[0]);
    const randomFriend = _.sample(leastContactedFriends);

    console.log('leastContactedFriends', JSON.stringify(leastContactedFriends));
    console.log('randomFriend', randomFriend);

    const prompt = await Prompt.create({userId: user_id, friendId: randomFriend});
    const name = friendIdToName[randomFriend];

    const text = `Hello, have you checked in with ${name} recently?`;

    await twilio.prompt(user.get('phone'), text);

    res.status(200).end();
  } else {
    res.status(404).end();
  }
};
