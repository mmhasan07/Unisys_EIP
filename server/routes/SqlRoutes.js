const router = require('express').Router();
const { getTables, getTableData, createRow, editRow, deleteRow, getTableColumns } = require('../controllers/mysqlController')
const fetchuser = require('./middleware/FetchUser')

getTables

router.get("/tables/get", getTables );
router.get("/tables/data/get/:tableName", getTableData );
router.get("/tables/data/getcol/:tableName", getTableColumns );

router.post("/tables/data/create", fetchuser,createRow );
router.put("/tables/data/edit",fetchuser, editRow );
router.delete("/tables/data/delete", fetchuser, deleteRow );

module.exports = router;
