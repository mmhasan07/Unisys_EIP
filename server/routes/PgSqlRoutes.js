const router = require('express').Router();
const { createRow, getRows, getAllTables, getColumnNames, deleteRow, editRow, createMultipleRows } = require('../controllers/pgsqlController')
const fetchuser = require('./middleware/FetchUser')


router.get("/pgtables/getTables", getAllTables );
router.get("/pgtables/getRows/:tableName", getRows );
router.get("/pgtables/getColumns/:tableName", getColumnNames );


router.post("/pgtables/data/create", createRow );
router.post("/pgtables/data/create/multiple", createMultipleRows );
router.put("/pgtables/data/edit", editRow );

router.delete("/pgtables/data/delete", deleteRow );

module.exports = router;
