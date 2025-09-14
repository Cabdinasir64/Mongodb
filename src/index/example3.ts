import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const db = client.db("database1");
        const products = db.collection("products");

        const bulkData: any[] = [];
        const sellers = ["Ali", "Amina", "Faadumo", "Hassan", "Said"];
        const categories = ["Electronics", "Books", "Clothing", "Furniture", "Toys"];

        const totalProducts = 1000000;

        for (let i = 0; i < totalProducts; i++) {
            bulkData.push({
                name: `Product ${i}`,
                category: categories[i % categories.length],
                price: Math.floor(Math.random() * 1000) + 10,
                seller: sellers[i % sellers.length],
                inStock: Math.random() > 0.2,
                rating: Math.floor(Math.random() * 5) + 1,
            });

            if (bulkData.length === 10000) {
                await products.insertMany(bulkData);
                bulkData.length = 0;
                console.log(`Inserted ${i + 1} products...`);
            }
        }

        if (bulkData.length > 0) {
            await products.insertMany(bulkData);
            console.log(`Inserted remaining ${bulkData.length} products`);
        }

        console.log("✅ 1,000,000+ products inserted!");


        await products.createIndex({ name: 1 }, { unique: true });

        await products.createIndex({ seller: 1 });

        await products.createIndex({ category: 1 });

        await products.createIndex({ price: 1 });

        await products.createIndex({ inStock: 1 });

        await products.createIndex({ rating: -1 });

        console.log("✅ Indexes created successfully!");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
