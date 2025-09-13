import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const database1 = client.db("database1");
        const db1col1 = database1.collection("collection1");

        // ========================
        // updateOne - update a single document
        // ========================
        const updateOneResult = await db1col1.updateOne(
            { name: "Abdinasir" },       // query
            { $set: { age: 22 } }        // update operation
        );
        console.log("updateOne Result:", updateOneResult.modifiedCount);

        // ========================
        // updateMany - update multiple documents
        // ========================
        const updateManyResult = await db1col1.updateMany(
            { age: { $lt: 25 } },       // query
            { $set: { status: "young" } } // update operation
        );
        console.log("updateMany Result:", updateManyResult.modifiedCount);

        // ========================
        // replaceOne - replace a single document entirely
        // ========================
        const replaceOneResult = await db1col1.replaceOne(
            { name: "Ali" }, 
            { name: "Ali", age: 26, city: "Hargeisa", status: "active" }
        );
        console.log("replaceOne Result:", replaceOneResult.modifiedCount);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run();
