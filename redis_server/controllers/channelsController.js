const Channels = require('../models/Channels')
const { initiateSubscribers } = require('../redis/subscriberInitiator')
const  client = require('../redis/redisConnector')

module.exports.createChannel = async (req, res, next) => {
  try {
    const { channelName, authorizedOrganizations } = req.body
    const { username, organization } = req.user

    const channelNameCheck = await Channels.findOne({ channelName: channelName.toUpperCase() });

    if (channelNameCheck) return res.status(400).json({ msg: "channelName already used", status: false });

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