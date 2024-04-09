const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongoLogin = require('./Databases/loginMongoConnector');
const {connectToPgSql} = require('./Databases/postgresqlConnector');
const UserRoutes = require('./routes/UserRoutes');
const SqlRoutes = require('./routes/SqlRoutes');
const pgSqlRoutes = require('./routes/PgSqlRoutes');
const MongoRoutes = require('./routes/MongoRoutes');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', UserRoutes);
app.use('/api/sql', SqlRoutes);
app.use('/api/pgsql', pgSqlRoutes);
app.use('/api/mongo', MongoRoutes);


const server = http.createServer(app);

// connectToMongo();
connectToMongoLogin()
connectToPgSql()

server.listen(process.env.PORT || 8000, () => {
  console.log(`app listening on Port ${process.env.PORT || 8000}`);
});