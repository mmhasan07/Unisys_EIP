const router = require('express').Router();
const { getDocuments, getDocumentData, createDocument, editDocument, deleteDocument, createMultipleDocuments } = require('../controllers/mongoController')
const fetchuser = require('./middleware/FetchUser')


router.get("/documents/get", getDocuments );
router.get("/documents/data/get/:documentName", getDocumentData );

router.post("/documents/data/create", createDocument );
router.post("/documents/data/create/multiple", createMultipleDocuments );
router.put("/documents/data/edit", editDocument );
router.delete("/documents/data/delete", deleteDocument );

module.exports = router;
