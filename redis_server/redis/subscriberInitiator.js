const Channels = require('../models/Channels')
const { emailAllSubscribers } = require('../controllers/emailController')


module.exports.initiateSubscribers = async (client) => {

    const channels = await Channels.find({});

    await Promise.all(channels.map(async (channel) => {
        const subscriber = client.duplicate();
        await subscriber.connect();
        await subscriber.subscribe(channel.channelName, async(data) => {
            const dataObj = JSON.parse(data)
         const result = await emailAllSubscribers(
            channel.channelName, 
            `"New Publish":Unisys EIP`, 
            `Unisys EIP`, 
            `<b>New data has been published !!</b><br/><br/>
            Published by User - <b>${dataObj.username}</b><br/> 
            Channel - <b>${channel.channelName}</b>`
        )
         console.log(result)
        });
    }));
}
