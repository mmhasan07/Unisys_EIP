const User = require("../models/UserModel");
const client = require('../redis/redisConnector')

module.exports.publish = async (req, res, next) => {
  try {
    const { channel, message } = req.body;

    const publisher = client.duplicate();
  
    await publisher.connect();
    // Publish the event to Redis
    await publisher.publish(channel, JSON.stringify(message));
    res.status(200).send({ status: "Event published" });
  } catch (ex) {
    next(ex);
  }
};