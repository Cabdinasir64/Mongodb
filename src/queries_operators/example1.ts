import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const db = client.db("database1");
        const users = db.collection("users");

        await users.deleteMany({});
        await users.insertMany([
            { name: "Ali", age: 25, city: "Mogadishu", status: "active", hobbies: ["reading", "coding"] },
            { name: "Omar", age: 30, city: "Hargeisa", status: "inactive", hobbies: ["swimming"] },
            { name: "Asha", age: 22, city: "Mogadishu", status: "active", hobbies: ["painting", "reading"] },
            { name: "Fatima", age: 28, city: "Berbera", status: "active", hobbies: ["reading"] }
        ]);

        // ----------------------
        // FIND queries
        // ----------------------
        console.log("=== Find users with age >= 25 ===");
        const ageQuery = await users.find({ age: { $gte: 25 } }).toArray();
        console.log(ageQuery);

        console.log("=== Find users in Mogadishu OR age < 25 ===");
        const orQuery = await users.find({ $or: [{ city: "Mogadishu" }, { age: { $lt: 25 } }] }).toArray();
        console.log(orQuery);

        console.log("=== Projection: only name and city ===");
        const projectionQuery = await users.find({}, { projection: { name: 1, city: 1, _id: 0 } }).toArray();
        console.log(projectionQuery);

        // ----------------------
        // UPDATE queries
        // ----------------------
        console.log("=== Update Ali's city to Hargeisa ===");
        await users.updateOne({ name: "Ali" }, { $set: { city: "Hargeisa" } });

        console.log("=== Increment Asha's age by 1 ===");
        await users.updateOne({ name: "Asha" }, { $inc: { age: 1 } });

        console.log("=== Add hobby to Fatima's hobbies ===");
        await users.updateOne({ name: "Fatima" }, { push: { hobbies:["coding", "dancing"] } });

        // ----------------------
        // DELETE queries
        // ----------------------
        console.log("=== Delete inactive users ===");
        await users.deleteMany({ status: "inactive" });

        // Verify final state
        console.log("=== Final users collection ===");
        const finalUsers = await users.find().toArray();
        console.log(finalUsers);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
};

run();
