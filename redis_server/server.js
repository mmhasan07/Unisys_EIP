const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongoLogin = require('./Databases/loginMongoConnector');
const AuthRoutes = require('./routes/authRoutes');
const RedisRoutes = require('./routes/redisRoutes');
const client = require('./redis/redisConnector')


require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/redis', RedisRoutes);

const server = http.createServer(app);

// connectToMongo();
connectToMongoLogin()

server.listen(process.env.PORT || 8000, () => {
  console.log(`app listening on Port ${process.env.PORT || 8000}`);
});