const { ObjectId } = require('mongodb');
const { connectToMongo } = require('../Databases/mongoConnector');


module.exports.getDocuments = async (req, res) => {
    try {
        const { client, db } = await connectToMongo();
        const collections = await db.listCollections().toArray();
        const tables = collections.map((collection) => collection.name);
        res.json({ tables });
        // Close the MongoDB connection after using it
        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports.getDocumentData = async (req, res) => {
    try {
        const { client, db } = await connectToMongo();
        const { documentName } = req.params;

        if (!documentName) {
            return res.status(400).json({ error: 'Collection name is required' });
        }

        const collection = db.collection(documentName);

        const collectionData = await collection.find({}).toArray();

        res.json({ documentData: collectionData });

        // Close the MongoDB connection after using it
        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.createDocument = async (req, res) => {
    try {
        const { client, db } = await connectToMongo();
        const { documentName, document } = req.body;

        if (!documentName || !document) {
            return res.status(400).json({ error: 'Collection name and document are required' });
        }

        const collection = db.collection(documentName);

        const result = await collection.insertOne(document);

        if (result.acknowledged) {
            res.status(201).json({ success: true, message: 'Entry created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create entry' });
        }

        // Close the MongoDB connection after using it
        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// module.exports.createMultipleDocument = async (req, res) => {
//     const { documentName, documents } = req.body; //documents is array of documents

//     try {
       
        

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports.createMultipleDocuments = async (req, res) => {
    try {
        const { client, db } = await connectToMongo();
        const { collectionName, documents } = req.body;

        if (!collectionName || !Array.isArray(documents) || documents.length === 0) {
            return res.status(400).json({ error: 'Collection name and non-empty array of documents are required' });
        }

        const collection = db.collection(collectionName);

        const result = await collection.insertMany(documents);

        if (result.acknowledged) {
            res.status(201).json({ success: true, message: 'Entries created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create entries' });
        }

        // Close the MongoDB connection after using it
        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.editDocument = async (req, res) => {
    const { documentName, document } = req.body;
    console.log(999)

    try {
        if (!documentName || !document || !document._id) {
            return res.status(400).json({ error: 'Document name and document with _id are required' });
        }

        const { client, db } = await connectToMongo();
        const collection = db.collection(documentName);

        const existingDocument = await collection.findOne({_id: new ObjectId(document._id) });
        if (!existingDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const updatedDocument = { ...document }; // Make a copy of the document object
        delete updatedDocument._id; // Remove _id field from the updated document object

        console.log('Existing document:', existingDocument);
        console.log('Updated document:', updatedDocument);

        const result = await collection.updateOne(
            { _id: new ObjectId(document._id) }, // Filter by _id
            { $set: updatedDocument } // Update with the new document fields
        );

        console.log(result)
        await client.close();


        if (result.acknowledged && result.modifiedCount > 0 ) {
            return res.status(200).json({ success: true, document });
        } else {
            return res.status(500).json({ error: 'Failed to edit entry' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};





module.exports.deleteDocument = async (req, res) => {
    const { documentName, _id } = req.body;

    try {

        const { client, db } = await connectToMongo();
        const collection = db.collection(documentName);

        const result = await collection.deleteOne( { _id: new ObjectId(_id) });

        await client.close()

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