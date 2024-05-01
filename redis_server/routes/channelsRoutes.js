const router = require('express').Router();
const { createChannel, getAllSubscribedChannels, getAllChannels, deleteChannel } = require('../controllers/channelsController')
const fetchuser = require('../routes/middleware/FetchUser')


router.get("/get", fetchuser, getAllSubscribedChannels);
router.get("/get/all", fetchuser, getAllChannels);
router.post("/create", fetchuser, createChannel);
router.delete("/delete", fetchuser, deleteChannel);

module.exports = router;
