const emailTransporter = require('../utils/emailTransporter')
const User = require('../models/UserModel')

module.exports.sendMailApi = async (req, res, next) => {
  try {
    const { to, subject, text, html } = req.body

    const mailData = {
      from: "saishwaranand132@gmail.com",
      // from: "eip.final.year.proj@gmail.com",
      to,
      subject,
      text,
      html,
    };

    emailTransporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
  } catch (ex) {
    res.status(500).send({ message: "Internal Server Err" });
  }
};


module.exports.emailAllSubscribers = async (channelName, subject, text, html) => {
  try {
    const users = await User.find({ subscribedChannels: channelName }, { email: 1, _id: 0 });
    const promises = [];

    console.log(users)

    users.forEach((user) => {
      const mailData = {
        from: 'saishwaranand132@gmail.com',
        // from: 'eip.final.year.proj@gmail.com',
        to: user.email,
        subject,
        text,
        html,
      };

      const emailPromise = new Promise((resolve, reject) => {
        emailTransporter.sendMail(mailData, (error, info) => {
          if (error) reject(`Error sending email to ${user.email}: ${error}`);
          else resolve(`Mail sent to ${user.email}: messageId = ${info.messageId}`);
        });
      });

      promises.push(emailPromise);
    });

    const result = await Promise.all(promises);
    return result;
  } catch (error) {
    console.error('Error sending emails:', error);
    return [ "Error sending emails" ];
  }
};