const router = require('express').Router();
const { getTables, getTableData } = require('../controllers/mysqlController')
const fetchuser = require('./middleware/FetchUser')

getTables

router.get("/tables/get", getTables );
router.get("/tables/data/get/:tableName", getTableData );

module.exports = router;
