const { createClient } = require('redis')

const client = createClient({
    password: '2xFEFcRtG70XEm3ykuq0ZnyOgvNwldGZ',
    socket: {
        host: 'redis-16218.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 16218
    }
});

const arr = ["orders", "clients", "prods"]

arr.map(async (channel) => {
    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe(channel, (message) => {
        console.log(channel, ":", message);
    });
})

module.exports = client;

