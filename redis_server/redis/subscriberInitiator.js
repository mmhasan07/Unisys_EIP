const Channels = require('../models/Channels')
const { emailAllSubscribers } = require('../controllers/emailController')


module.exports.initiateSubscribers = async (client) => {

    const channels = await Channels.find({});

    await Promise.all(channels.map(async (channel) => {
        const subscriber = client.duplicate();
        await subscriber.connect();
        await subscriber.subscribe(channel.channelName, async(message) => {
            console.log(channel.channelName, ":", message);
         const result = await emailAllSubscribers(channel.channelName, "From Saishwar", "That was easy!", "<b>Hey there! </b><br> Node mailer test Mail<br/>")
         console.log(result)
        });
    }));
}
