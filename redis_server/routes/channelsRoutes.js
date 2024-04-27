const router = require('express').Router();
const { createChannel } = require('../controllers/channelsController')


router.post("/create", createChannel);

module.exports = router;
