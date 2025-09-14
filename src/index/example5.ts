import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");
        const products = db.collection("products");

        console.log("🚀 Running name-only search queries...");

        const exactMatch = await products.find({ name: "Product 999" }).limit(5).toArray();
        console.log("📌 Exact match search:", exactMatch);

        const caseInsensitive = await products
            .find({ name: { $regex: "product 999", $options: "i" } })
            .limit(5)
            .toArray();
        console.log("📌 Case-insensitive search:", caseInsensitive);

        const startsWith = await products
            .find({ name: { $regex: "^Product 1" } })
            .limit(5)
            .toArray();
        console.log("📌 Starts with 'Product 1':", startsWith);

        const contains = await products
            .find({ name: { $regex: "99" } })
            .limit(5)
            .toArray();
        console.log("📌 Contains '99':", contains);

        const sellerName = await products
            .find({ seller: "Ali", name: { $regex: "Product 1" } })
            .limit(5)
            .toArray();
        console.log("📌 Seller 'Ali' and name contains 'Product 1':", sellerName);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
