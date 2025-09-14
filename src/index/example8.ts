import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");

        const users = db.collection("usersHashed");

        const page = 1;
        const pageSize = 10;
        const skipCount = (page - 1) * pageSize;

        const usersPage = await users
            .find({})
            .sort({ age: 1 })   
            .skip(skipCount)      
            .limit(pageSize)     
            .toArray();

        console.log("📌 Users page 1:", usersPage);

        const usersPage2 = await users
            .find({})
            .sort({ age: 1 })
            .skip(skipCount + pageSize)
            .limit(pageSize)
            .toArray();

        console.log("📌 Users page 2:", usersPage2);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
