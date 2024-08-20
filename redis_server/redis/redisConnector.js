const { createClient } = require('redis')
const { initiateSubscribers } = require('./subscriberInitiator')

const client = createClient({
    password: 'your_password',
    socket: {
        host: 'redis-11948.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11948
    }
});

initiateSubscribers(client)


module.exports = client;

