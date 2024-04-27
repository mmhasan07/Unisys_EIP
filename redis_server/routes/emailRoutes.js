const router = require('express').Router();
const { sendMailApi } = require('../controllers/emailController')


router.post("/send", sendMailApi);

module.exports = router;
