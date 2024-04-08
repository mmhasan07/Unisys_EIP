const mongoose = require('mongoose');


module.exports.getDocuments = async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const tables = collections.map((collection) => collection.name);

        res.json({ tables });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.getDocumentData = async (req, res) => {
    try {
        const { documentName } = req.params;

        if (!documentName) {
            return res.status(400).json({ error: 'Document name is required' });
        }

        const Model = mongoose.connection.model(documentName);

        if (!Model) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        const documentData = await Model.find({});

        res.json({ documentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports.createDocument = async (req, res) => {
    const { documentName, document } = req.body;

    try {
        if (!documentName) {
            return res.status(400).json({ error: 'Document name is required' });
        }

        const Model = mongoose.connection.model(documentName);

        const createdDocument = await Model.create(document);
        res.status(201).json({ success: true, document: createdDocument });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.createMultipleDocument = async (req, res) => {
    const { documentName, documents } = req.body; //documents is array of documents

    try {
       
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports.editDocument = async (req, res) => {
    const { documentName, document } = req.body;

    try {
        if (!documentName) return res.status(400).json({ error: 'Document name is required' });

        const Model = mongoose.connection.model(documentName);

        const { _id, ...updatedFields } = document;

        const result = await Model.updateOne({ _id }, { $set: updatedFields });

        res.status(201).json({ success: true, document });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports.deleteDocument = async (req, res) => {
    const { documentName, _id } = req.body;

    try {

        const Model = mongoose.connection.model(documentName);

        const result = await Model.deleteOne({ _id });

        if (result.deletedCount === 1) {
            return res.json({ success: true, documentName });
        } else {
            return res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};