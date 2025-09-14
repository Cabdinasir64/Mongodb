import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");

        // Create collection for hashed index example
        const users = db.collection("usersHashed");

        console.log("🚀 Inserting 1,000,000 users with emails...");

        const batchSize = 10000;
        let bulkData: any[] = [];

        for (let i = 0; i < 1_000_000; i++) {
            bulkData.push({
                email: `user${i}@example.com`,
                name: `User ${i}`,
                age: Math.floor(Math.random() * 60) + 18,
            });

            if (bulkData.length === batchSize) {
                await users.insertMany(bulkData);
                bulkData.length = 0;
                console.log(`Inserted ${i + 1} users...`);
            }
        }

        if (bulkData.length > 0) {
            await users.insertMany(bulkData);
            console.log(`Inserted remaining ${bulkData.length} users`);
        }

        console.log("✅ 1,000,000 users inserted!");

        // Create hashed index on email
        console.log("🚀 Creating hashed index on 'email' field...");
        await users.createIndex({ email: "hashed" });
        console.log("✅ Hashed index created successfully!");

        // Example equality query
        const emailSearch = await users.find({ email: "user99999@example.com" }).toArray();
        console.log(`📌 Users with email 'user99999@example.com':`, emailSearch.length);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
