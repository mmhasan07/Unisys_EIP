const { MongoClient } = require("mongodb");

const connectToMongo = async () => {
    try {
        const connectionString = process.env.MONGO_URI || "";
        const client = new MongoClient(connectionString);
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("test");
        return { client, db };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Re-throw the error to handle it elsewhere
    }
};

module.exports = { connectToMongo };