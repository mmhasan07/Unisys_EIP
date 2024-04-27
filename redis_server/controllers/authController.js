const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Channels = require('../models/Channels')
const { intersection } = require('lodash');

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, organization, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res.status(400).json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ msg: "Email already used", status: false });

    const securePassword = await bcrypt.hash(password, 10); // 10 is the salt

    const user = await User.create({
      email,
      username,
      organization: organization.toUpperCase(),
      password: securePassword,
    });

    const data = {
      user: {
        id: user._id,
        username: user.username,
        organization: user.organization.toUpperCase(),
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    return res.status(201).json({ status: true, authToken, username });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     let user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({
//         status: false,
//         msg: "Please login with correct details",
//       });
//     }
//     const passwordCompare = await bcrypt.compare(password, user.password);
//     if (!passwordCompare) {
//       return res.status(401).json({
//         status: false,
//         msg: "Please login with correct details",
//       });
//     }

//     const data = {
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     };
//     const authToken = jwt.sign(data, process.env.JWT_SECRET);

//     const arr = user.subscribedChannels
//     const channels = await Channels.find({})

//     res.json({ status: true, authToken, username });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ status: false, msg: "Internal server error occurred" });
//   }
// };
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: false,
        msg: "Please login with correct details",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        status: false,
        msg: "Please login with correct details",
      });
    }

    // Find the intersection of user's subscribed channels and existing channels in the database
    const channelsInDb = (await Channels.find({}, { channelName: 1 })).map(channel => channel.channelName);
    const updatedSubscribedChannels = intersection(user.subscribedChannels, channelsInDb);

    // Update user's subscribed channels
    await User.findByIdAndUpdate(user._id, { subscribedChannels: updatedSubscribedChannels });

    const data = {
      user: {
        id: user._id,
        username: user.username,
        organization: user.organization,
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ status: true, authToken, username });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: false, msg: "Internal server error occurred" });
  }
};

module.exports.temp = async (req, res, next) => {
  // just to demo a controller using fetchuser middleware
  try {
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    });
  } catch (ex) {
    next(ex);
  }
};
