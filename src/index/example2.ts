import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const db = client.db("database1");
        const users = db.collection("users");

        await users.createIndex({ name: 1 });

        const stats = await users.find({ name: "Ali" }).explain("executionStats");
        console.log(JSON.stringify(stats, null, 2));

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
