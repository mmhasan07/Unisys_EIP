const router = require('express').Router();
const { publish, subscribe, unsubscribe } = require('../controllers/redisController')
const fetchuser = require('./middleware/FetchUser')


router.post("/publish", fetchuser, publish);
router.post("/subscribe", fetchuser, subscribe);
router.post("/unsubscribe", fetchuser, unsubscribe);

module.exports = router;
