const { createClient } = require('redis')
const { initiateSubscribers } = require('./subscriberInitiator')

const client = createClient({
    password: '2xFEFcRtG70XEm3ykuq0ZnyOgvNwldGZ',
    socket: {
        host: 'redis-16218.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 16218
    }
});

initiateSubscribers(client)


module.exports = client;

