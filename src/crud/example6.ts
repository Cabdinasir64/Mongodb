import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const database1 = client.db("database1");
        const db1col1 = database1.collection("collection1");

        // Insert some demo documents
        await db1col1.insertMany([
            { name: "Ali", age: 22 },
            { name: "Fadumo", age: 25 },
            { name: "Ali", age: 30 }
        ]);

        // 1️⃣ Delete one document (filter by name)
        const deleteOneResult = await db1col1.deleteOne({ name: "Ali" });
        console.log(`deleteOne -> Deleted ${deleteOneResult.deletedCount} document`);

        // 2️⃣ Delete many documents (filter by name)
        const deleteManyResult = await db1col1.deleteMany({ name: "Ali" });
        console.log(`deleteMany -> Deleted ${deleteManyResult.deletedCount} documents`);

        // 3️⃣ Delete by _id
        const oneDoc = await db1col1.findOne({});
        if (oneDoc) {
            const deleteByIdResult = await db1col1.deleteOne({ _id: oneDoc._id });
            console.log(`deleteOne by _id -> Deleted ${deleteByIdResult.deletedCount} document with _id: ${oneDoc._id}`);
        }

        // 4️⃣ Drop the entire collection
        const dropResult = await db1col1.drop();
        console.log(`drop -> Collection dropped? ${dropResult}`);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
};

run();
