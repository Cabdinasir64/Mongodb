import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/"
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        // using a specific database
        const database1 = client.db("database1");

        // using a specific collection
        const db1col1 = database1.collection("collection1");
        const db1col2 = database1.collection("collection2");
        const db1col3 = database1.collection("collection3");


        // find all documents in the collection
        const result = await db1col1.deleteMany({});
        console.log(`${result.deletedCount} documents deleted.`);

        // find all documents in the collection
        const allDocs = await db1col2.find().toArray();
        console.log("All documents in collection2:", allDocs);
        console.log("Total documents:", allDocs.length);

        // get id of the first document
        if (allDocs.length > 0) {
            const firstDocId = allDocs[0]?._id;
            firstDocId;
            console.log("ID of the first document:", firstDocId);
        }
        else {
            console.log("No documents found in collection2.");
        }

        // delete the first document using its id
        const firstDocId = allDocs[0]?._id;
        if (firstDocId) {
            const deleteResult = await db1col2.deleteOne({ _id: firstDocId });
            console.log(`Deleted ${deleteResult.deletedCount} document with ID: ${firstDocId}`);
        }

        // delete the second document using its id
        const secondDocId = allDocs[1]?._id;
        if (secondDocId) {
            const deleteResult = await db1col2.deleteOne({ _id: secondDocId });
            console.log(`Deleted ${deleteResult.deletedCount} document with ID: ${secondDocId}`);
        }

        // deleted collection 
        const dropResult = await db1col3.drop();
        const dropResult2 = await db1col2.drop();
        if (dropResult || dropResult2) {
            console.log("One or more collections dropped successfully.");
        } else {
            console.log("Collections do not exist or could not be dropped.");
        }


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run();
