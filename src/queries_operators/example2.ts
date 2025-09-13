import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");
        const users = db.collection("users");

        // ----------------------
        // Clear collection and insert sample data
        // ----------------------
        await users.deleteMany({});
        await users.insertMany([
            { name: "Ali", age: 25, city: "Mogadishu", status: "active", hobbies: ["reading"] },
            { name: "Omar", age: 30, city: "Hargeisa", status: "inactive", hobbies: ["swimming"] },
            { name: "Asha", age: 22, city: "Mogadishu", status: "active", hobbies: ["painting"] },
            { name: "Fatima", age: 28, city: "Berbera", status: "active", hobbies: ["reading"] }
        ]);

        // ----------------------
        // Comparison operators
        // ----------------------
        console.log("=== Users with age between 23 and 28 ===");
        const ageRange = await users.find({ age: { $gte: 23, $lte: 28 } }).toArray();
        console.log(ageRange);

        console.log("=== Users not in Mogadishu ===");
        const notInCity = await users.find({ city: { $ne: "Mogadishu" } }).toArray();
        console.log(notInCity);

        console.log("=== Users with age in [22, 28, 30] ===");
        const inArray = await users.find({ age: { $in: [22, 28, 30] } }).toArray();
        console.log(inArray);

        // ----------------------
        // Logical operators
        // ----------------------
        console.log("=== Users active AND in Mogadishu ===");
        const andQuery = await users.find({ $and: [{ status: "active" }, { city: "Mogadishu" }] }).toArray();
        console.log(andQuery);

        console.log("=== Users inactive OR age < 25 ===");
        const orQuery = await users.find({ $or: [{ status: "inactive" }, { age: { $lt: 25 } }] }).toArray();
        console.log(orQuery);

        // ----------------------
        // Update array fields
        // ----------------------
        console.log("=== Add 'coding' hobby to Fatima using $addToSet ===");
        await users.updateOne(
            { name: "Fatima" },
            { $addToSet: { hobbies: "coding" } }
        );

        console.log("=== Remove 'reading' hobby from Ali using $pull ===");
        await users.updateOne(
            { name: "Ali" },
            { pull: { hobbies: "reading" } }
        );

        console.log("=== Add multiple hobbies to Asha using $push + $each ===");
        await users.updateOne(
            { name: "Asha" },
            { push: { hobbies: { $each: ["dancing", "swimming"] } } }
        );

        // ----------------------
        // Update multiple fields
        // ----------------------
        console.log("=== Update Omar's status to active and increment age ===");
        await users.updateOne(
            { name: "Omar" },
            { $set: { status: "active" }, $inc: { age: 1 } }
        );

        // ----------------------
        // Final collection state
        // ----------------------
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
