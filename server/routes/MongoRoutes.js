const router = require('express').Router();
const { getDocuments, getDocumentData} = require('../controllers/mongoController')
const fetchuser = require('./middleware/FetchUser')


router.get("/documents/get", getDocuments );
router.get("/documents/data/get/:documentName", getDocumentData );

module.exports = router;
