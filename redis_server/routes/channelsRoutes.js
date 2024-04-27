const router = require('express').Router();
const { createChannel } = require('../controllers/channelsController')
const fetchuser = require('../routes/middleware/FetchUser')


router.post("/create", fetchuser, createChannel);

module.exports = router;
