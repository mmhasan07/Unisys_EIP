const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongoLogin = require('./Databases/loginMongoConnector');
const AuthRoutes = require('./routes/authRoutes');
const RedisRoutes = require('./routes/redisRoutes');
const EmailRoutes = require('./routes/emailRoutes');
const ChannelsRoutes = require('./routes/channelsRoutes');
const client = require('./redis/redisConnector')
const emailTransporter = require('./utils/emailTransporter')


require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/redis', RedisRoutes);
app.use('/api/email', EmailRoutes);
app.use('/api/channels', ChannelsRoutes);

const server = http.createServer(app);

// connectToMongo();
connectToMongoLogin()

server.listen(process.env.PORT || 8081, () => {
  console.log(`app listening on Port ${process.env.PORT || 8081}`);
});
