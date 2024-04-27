const router = require('express').Router();
const { publish, subscribe } = require('../controllers/redisController')
const fetchuser = require('./middleware/FetchUser')


router.post("/publish", fetchuser, publish);
router.post("/subscribe", fetchuser, subscribe);

module.exports = router;
