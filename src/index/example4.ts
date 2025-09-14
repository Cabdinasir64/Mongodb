import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");
        const products = db.collection("products");

        console.log("🚀 Running queries with filter, sort, and search...");

        const electronics = await products.find({ category: "Electronics" }).limit(5).toArray();
        console.log("📌 Electronics products:", electronics);

        const affordableInStock = await products
            .find({ inStock: true, price: { $lt: 500 } })
            .limit(5)
            .toArray();
        console.log("📌 Affordable in-stock products:", affordableInStock);

        const searchProduct = await products
            .find({ name: { $regex: "Product 99", $options: "i" } })
            .limit(5)
            .toArray();
        console.log("📌 Search results for 'Product 99':", searchProduct);

        const cheapestProducts = await products
            .find({})
            .sort({ price: 1 })
            .limit(5)
            .toArray();
        console.log("📌 Cheapest products:", cheapestProducts);

        const topRatedProducts = await products
            .find({})
            .sort({ rating: -1 })
            .limit(5)
            .toArray();
        console.log("📌 Top-rated products:", topRatedProducts);

        const electronicsSorted = await products
            .find({ category: "Electronics", inStock: true })
            .sort({ price: 1 })
            .limit(5)
            .toArray();
        console.log("📌 Electronics in-stock sorted by price:", electronicsSorted);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
