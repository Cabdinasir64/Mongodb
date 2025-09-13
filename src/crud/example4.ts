import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const database1 = client.db("database1");
        const db1col1 = database1.collection("collection1");

        // ========================
        // findOne - get single document
        // ========================
        const singleDoc = await db1col1.findOne({ name: "Abdinasir" });
        console.log("findOne Result:", singleDoc);

        // ========================
        // find - get multiple documents
        // ========================
        const allDocsCursor = db1col1.find(); 
        const allDocs = await allDocsCursor.toArray();
        console.log("find Result:", allDocs);

        // ========================
        // countDocuments - count documents matching query
        // ========================
        const count = await db1col1.countDocuments();
        console.log("countDocuments Result:", count);

        // ========================
        // distinct - get unique values for a field
        // ========================
        const uniqueCities = await db1col1.distinct("city");
        console.log("distinct Result (unique cities):", uniqueCities);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run();
