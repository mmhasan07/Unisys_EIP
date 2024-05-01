const Channels = require('../models/Channels')
const Users = require('../models/UserModel')
const { initiateSubscribers } = require('../redis/subscriberInitiator')
const  client = require('../redis/redisConnector')

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
    const channels = await Channels.find({ });

      return res.status(201).json({ status: true, channels });
  } catch (ex) {
    return res.json({ status: false, msg: "some error" });
  }
};


module.exports.deleteChannel = async (req, res, next) => {
    try {
        const { channelName } = req.body;
        const { username, organization } = req.user;

        // Find the channel by channelName
        const channel = await Channels.findOne({ channelName });

        if (!channel) {
            return res.json({ status: false, msg: "Channel not found" });
        }

        // Check if the user is an admin or if the organization is authorized to delete the channel
        if (username === 'admin' || channel.authorizedOrganizations.includes(organization)) {
            await Channels.deleteOne({ channelName });
            return res.status(200).json({ status: true, msg: "Channel deleted successfully" });
        } else {
            return res.json({ status: false, msg: "You are not authorized to delete this channel" });
        }
    } catch (ex) {
        console.error('Error deleting channel:', ex);
        return res.status(500).json({ status: false, msg: "Internal server error occurred" });
    }
};
