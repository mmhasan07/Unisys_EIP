const User = require("../models/UserModel");
const Channels = require("../models/Channels");
const client = require('../redis/redisConnector')

module.exports.publish = async (req, res, next) => {
  try {
    const { channel, message } = req.body;
    const { username } = req.user;

    const user = await User.findOne({ username });
    const channelInDb = await Channels.findOne({ channelName: channel })

    if (!channelInDb) res.status(400).send({ status: false, msg: "no such channel exists !" });
    console.log(channel.channelName)

    if (channelInDb.authorizedOrganizations.includes(user.organization)) {
      const publisher = client.duplicate();

      await publisher.connect();
      // Publish the event to Redis
      await publisher.publish(channel, JSON.stringify(message));
      res.status(200).send({ status: true, msg: "Event published" });
    }
    else {
      res.status(401).send({ status: false, msg: "Your organization is not authorized to publish on this channel" });
    }

  } catch (ex) {
    next(ex);
  }
};


module.exports.subscribe = async (req, res, next) => {
  try {
    const { channelName } = req.body;
    const { username } = req.user;

    const publisher = client.duplicate();

    await publisher.connect();
    await publisher.publish(channel, JSON.stringify(message));
    res.status(200).send({ status: "Event published" });
  } catch (ex) {
    next(ex);
  }
};