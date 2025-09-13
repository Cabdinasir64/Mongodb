import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const database1 = client.db("database1");
        const db1col1 = database1.collection("collection1");

        // ========================
        // insertOne - one document
        // ========================
        const singleInsertResult = await db1col1.insertOne({
            name: "Abdinasir",
            age: 21,
            city: "Mogadishu"
        });
        console.log("insertOne Result:", singleInsertResult.insertedId);

        // =========================
        // insertMany - multiple documents
        // =========================
        const multipleInsertResult = await db1col1.insertMany([
            { name: "Ali", age: 25, city: "Hargeisa" },
            { name: "Hodan", age: 22, city: "Garowe" },
            { name: "Yusuf", age: 28, city: "Kismayo" }
        ]);
        console.log("insertMany Result IDs:", multipleInsertResult.insertedIds);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run();
