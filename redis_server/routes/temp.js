const redis = require("redis");

// Create a new Redis client
const client = redis.createClient({
  host: "your-redis-host",
  port: your - redis - port,
  password: "your-redis-password",
});

// Assuming you have a router instance
router.post("/publish", (req, res) => {
  // Extract event data from request body
  const { channel, message } = req.body;ß

  // Publish the event to Redis
  client.publish(channel, JSON.stringify(message), (err) => {
    if (err) {
      res.status(500).send({ error: "Failed to publish event" });
    } else {
      res.status(200).send({ status: "Event published" });
    }
  });
});





const redis = require("redis");

// Create a new Redis client
const client = redis.createClient({
  host: "your-redis-host",
  port: your-redis-port,
  password: "your-redis-password",
});

// Subscribe to the 'orders' channel
client.subscribe("orders");

// Listen for messages on the 'orders' channel
client.on("message", (channel, message) => {
  console.log(Received the following message from ${channel}: ${message});
});