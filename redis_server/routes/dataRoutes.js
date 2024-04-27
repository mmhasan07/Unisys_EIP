const router = require('express').Router();
const { markDataAsSeen, getSubscriberData } = require('../controllers/DataController')
const fetchuser = require('./middleware/FetchUser')

router.get("/subscriber/get", fetchuser, getSubscriberData);
router.post("/markseen", fetchuser, markDataAsSeen);

module.exports = router;
