const Channels = require('../models/Channels')

module.exports.createChannel = async (req, res, next) => {
  try {
    const { channelName, authorizedOrganizations } = req.body

    const channelNameCheck = await Channels.findOne({ channelName });

    if (channelNameCheck)
      return res.status(400).json({ msg: "channelName already used", status: false });

      const channel = await Channels.create({
        channelName: channelName.toUpperCase(),
        authorizedOrganizations,
      });

      return res.status(201).json({ status: true, channelName: channel.channelName });
  } catch (ex) {
    next(ex);
  }
};