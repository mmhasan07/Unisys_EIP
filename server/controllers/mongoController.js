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
