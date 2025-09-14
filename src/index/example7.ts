import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");

        const users = db.collection("usersHashed");

        const emailSearch = await users.find({ email: "user99999@example.com" }).toArray();
        console.log("Search Result:", emailSearch);
        const emailsearch2 = await users.find({ email: "user88888@example.com" }).toArray();
        console.log("Search Result:", emailsearch2);
        const emailsearch3 = await users.find({ email: "user77777@example.com" }).toArray();
        console.log("Search Result:", emailsearch3);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
