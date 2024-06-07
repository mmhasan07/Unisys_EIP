const router = require('express').Router();
const { createChannel, getAllSubscribedChannels, getAllChannels, deleteChannel, addMultiOrgs, getAllOrgs } = require('../controllers/channelsController')
const fetchuser = require('../routes/middleware/FetchUser')


router.get("/get", fetchuser, getAllSubscribedChannels);
router.get("/get/all", fetchuser, getAllChannels);
router.post("/create", fetchuser, createChannel);
router.delete("/delete", fetchuser, deleteChannel);
router.put("/addmultiorgs", fetchuser, addMultiOrgs);
router.get("/getallorgs", fetchuser, getAllOrgs);

module.exports = router;
