const router = require('express').Router();
const { publish } = require('../controllers/redisController')
const fetchuser = require('./middleware/FetchUser')


router.post("/publish", publish);

module.exports = router;
