const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const connectToMongo = require('./Databases/mongoConnector');
const mysqlDb = require('./Databases/mysqlConnector')
const UserRoutes = require('./routes/UserRoutes');
const SqlRoutes = require('./routes/SqlRoutes');
const MongoRoutes = require('./routes/MongoRoutes');
const internSchema = require("./models/InternsModel")
const SalarySchema = require("./models/SalaryModel")

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', UserRoutes);
app.use('/api/sql', SqlRoutes);
app.use('/api/mongo', MongoRoutes);


const server = http.createServer(app);

connectToMongo();

server.listen(process.env.PORT || 8000, () => {
  console.log(`app listening on Port ${process.env.PORT || 8000}`);
});