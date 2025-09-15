import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("shopDB");

        const usersCollection = db.collection("users");
        const productsCollection = db.collection("products");
        const ordersCollection = db.collection("orders");

        const seller = await usersCollection.insertOne({
            name: "Seller Ali",
            role: "seller",
            email: "seller@example.com",
        });

        const product = await productsCollection.insertOne({
            name: "Laptop",
            price: 1200,
            seller_id: seller.insertedId,
        });

        const buyers = Array.from({ length: 500_000 }, (_, i) => ({
            name: `Buyer ${i}`,
            role: "buyer",
            email: `buyer${i}@example.com`,
        }));

        const buyersResult = await usersCollection.insertMany(buyers);
        console.log("✅ Inserted buyers:", buyersResult.insertedCount);

        const orders = Object.values(buyersResult.insertedIds).map((buyerId) => ({
            buyer_id: buyerId,
            product_id: product.insertedId,
            quantity: Math.floor(Math.random() * 5) + 1,
            order_date: new Date(),
        }));

        await ordersCollection.insertMany(orders);
        console.log("✅ Inserted orders:", orders.length);
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close();
    }
};

run();
