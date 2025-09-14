import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const database = client.db("database1");
        const collection = database.collection("exampleCollection");

        const documents = [];
        for (let i = 1; i <= 50; i++) {
            documents.push({
                item: `item${i}`,
                category: `category${i % 5}`,
                quantity: Math.floor(Math.random() * 100) + 1,
                price: Math.floor(Math.random() * 500) + 50,
                status: i % 2 === 0 ? "A" : "B" 
            });
        }

        const insertResult = await collection.insertMany(documents);
        console.log(`Inserted ${insertResult.insertedCount} documents`);

        const aggregationPipeline = [
            { $match: { status: "A" } }, 
            { $group: { _id: "$category", totalQuantity: { $sum: "$quantity" }, avgPrice: { $avg: "$price" } } },
            { $sort: { totalQuantity: -1 } },
        ];

        const aggCursor = collection.aggregate(aggregationPipeline);
        const aggResults = await aggCursor.toArray();

        console.log("Aggregation Results:");
        console.table(aggResults);

    } catch (error) {
        console.error("Error connecting to MongoDB or running operations:", error);
    } finally {
        await client.close();
    }
};

run();
