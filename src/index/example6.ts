import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");

        const textProducts = db.collection("textProducts");

        console.log("🚀 Inserting sample products into 'textProducts'...");

        const sampleData = [
            { name: "Product 1", category: "Electronics", description: "High quality electronics" },
            { name: "Product 2", category: "Books", description: "Educational book" },
            { name: "Product 3", category: "Clothing", description: "Comfortable t-shirt" },
            { name: "Product 99", category: "Electronics", description: "Latest gadget" },
            { name: "Product 100", category: "Toys", description: "Fun toy for kids" },
        ];

        await textProducts.insertMany(sampleData);
        console.log("✅ Sample products inserted!");

        console.log("🚀 Creating text index on 'name', 'category', and 'description'...");

        await textProducts.createIndex({ name: "text", category: "text", description: "text" });
        console.log("✅ Text index created successfully!");

        const search1 = await textProducts.find({ $text: { $search: "Product 99" } }).toArray();
        console.log("📌 Search 'Product 99':", search1);

        const search2 = await textProducts.find({ $text: { $search: "Electronics" } }).toArray();
        console.log("📌 Search 'Electronics':", search2);

        const search3 = await textProducts.find({ $text: { $search: "Product -Books" } }).toArray();
        console.log("📌 Search 'Product' excluding 'Books':", search3);

        const searchWithScore = await textProducts
            .find({ $text: { $search: "Product 99" } }, { projection: { score: { $meta: "textScore" } } })
            .sort({ score: { $meta: "textScore" } })
            .toArray();
        console.log("📌 Search with relevance score:", searchWithScore);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
