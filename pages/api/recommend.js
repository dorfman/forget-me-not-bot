const { Friend, User, Prompt } = require('../../models');
const twilio = require('../../lib/twilio');
const _ = require('lodash');
const Promise = require('bluebird'); // bluebird > Promise

/**
 * Send a text message prompting the User contact a Friend they haven't contacted recently.
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
async function promptUser(user) {
  console.log(user.id);
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

  const prompt = await Prompt.create({
    userId: user.id,
    friendId: randomFriend,
  });
  const name = friendIdToName[randomFriend];

  const text = `Hello, have you checked in with ${name} recently?`;

  return twilio.prompt(user.get('phone'), text);
}

export default async (req, res) => {
  if (req.method === 'POST') {
    let user_id = req.body.user_id;
    console.log(user_id);

    if (!user_id) {
      return res.status(400).json({
        httpCode: 400,
        message: 'Must provide valid user_id',
      });
    } else if (user === '*') {
      let users = await User.findAll();

      console.log(users.length);
      if (!users) {
        return res.status(404).json({
          httpCode: 500,
          message: 'Could not fetch users',
        });
      }

      // Synchronous to avoid violating Twilio's rate limit.
      await Promise.mapSeries(users, promptUser);
      res.status(200).end();
    } else {
      let user = await User.findByPk(user_id);

      console.log(user);
      if (!user) {
        return res.status(404).json({
          httpCode: 404,
          message: 'User not found',
        });
      }
      await promptUser(user);
    }
    res.status(200).end();
  } else {
    res.status(404).end();
  }
};
