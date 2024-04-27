const Data = require('../models/Data');
const User = require('../models/UserModel');


module.exports.getSubscriberData = async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username });
    const subscribedChannels = user.subscribedChannels;

    const subscribedData = await Data.find({ channelName: { $in: subscribedChannels } }).sort({ date: -1 }); 

    res.json({ status: true, subscribedData });
  } catch (ex) {
    next(ex);
  }
};

module.exports.markDataAsSeen = async (req, res, next) => {
  try {
    const { username } = req.user;
    const { document_id } = req.body;

    const data = await Data.findById(document_id);

    if (!data) {
      return res.status(404).json({ status: false, msg: "Data not found" });
    }

    data.seenBy.push(username);
    await data.save();

    res.json({ status: true, msg: "Data marked as seen" });
  } catch (ex) {
    next(ex);
  }
};