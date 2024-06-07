const Channels = require('../models/Channels')
const Users = require('../models/UserModel')
const { initiateSubscribers } = require('../redis/subscriberInitiator')
const client = require('../redis/redisConnector')
const Data = require('../models/Data')
const User = require('../models/UserModel')
const { intersection } = require('lodash');


module.exports.createChannel = async (req, res, next) => {
  try {
    const { channelName, authorizedOrganizations } = req.body
    const { username, organization } = req.user

    const channelNameCheck = await Channels.findOne({ channelName: channelName.toUpperCase() });

    if (channelNameCheck) return res.json({ msg: "channelName already used", status: false });

    const channel = await Channels.create({
      channelName: channelName.toUpperCase(),
      authorizedOrganizations: username === "admin" ? authorizedOrganizations : ["EIP", organization],
    });

    initiateSubscribers(client)
    return res.status(201).json({ status: true, channelName: channel.channelName });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllSubscribedChannels = async (req, res, next) => {
  try {
    const { username } = req.user

    const user = await Users.findOne({ username });

    return res.status(201).json({ status: true, subscribedChannels: user.subscribedChannels });
  } catch (ex) {
    return res.json({ status: false, msg: "some error" });
    next(ex);
  }
};


module.exports.getAllChannels = async (req, res, next) => {
  try {
    const channels = await Channels.find({});

    return res.status(201).json({ status: true, channels });
  } catch (ex) {
    return res.json({ status: false, msg: "some error" });
  }
};


module.exports.deleteChannel = async (req, res, next) => {
  try {
    const { channelName } = req.body;
    const { username, organization } = req.user;
    let user = await User.findOne({ username });

    // Find the channel by channelName
    const channel = await Channels.findOne({ channelName });

    if (!channel) {
      return res.json({ status: false, msg: "Channel not found" });
    }

    // Check if the user is an admin or if the organization is authorized to delete the channel
    if (username === 'admin' || channel.authorizedOrganizations.includes(organization)) {
      await Channels.deleteOne({ channelName });
      await Data.deleteMany({ channelName })
      // Find the intersection of user's subscribed channels and existing channels in the database
      const channelsInDb = (await Channels.find({}, { channelName: 1 })).map(channel => channel.channelName);
      const updatedSubscribedChannels = intersection(user.subscribedChannels, channelsInDb);

      // Update user's subscribed channels
      await User.findByIdAndUpdate(user._id, { subscribedChannels: updatedSubscribedChannels });
      return res.status(200).json({ status: true, msg: "Channel deleted successfully" });
    } else {
      return res.json({ status: false, msg: "You are not authorized to delete this channel" });
    }
  } catch (ex) {
    console.error('Error deleting channel:', ex);
    return res.status(500).json({ status: false, msg: "Internal server error occurred" });
  }
};

module.exports.addMultiOrgs = async (req, res, next) => {
  try {
    const { channelName, organization } = req.body;
    const { username } = req.user;

    if (username !== "admin") {
      return res.status(403).json({ status: false, msg: "Unauthorized" });
    }

    const channel = await Channels.findOneAndUpdate(
      { channelName: channelName.toUpperCase() },
      { $addToSet: { authorizedOrganizations: organization } },
      { new: true }
    );

    if (!channel) {
      return res.status(404).json({ status: false, msg: "Channel not found" });
    }

    return res.status(201).json({ status: true, channelName: channel.channelName });
  } catch (ex) {
    next(ex);
  }
};


module.exports.getAllOrgs = async (req, res, next) => {
  try {
    const { username } = req.user;

    const allUsers = await Users.find({}, 'organization');

    // Extract unique organizations
    const uniqueOrgs = [...new Set(allUsers.map(user => user.organization))];

    return res.status(200).json({ status: true, allOrganizations: uniqueOrgs });
  } catch (ex) {
    next(ex);
  }
};