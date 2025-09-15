import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("shopDB");

        const usersCollection = db.collection("users");
        const ordersCollection = db.collection("orders");
        const productsCollection = db.collection("products");

        const orders = await ordersCollection.find().toArray();

        const buyers = await usersCollection.find({ role: "buyer" }).toArray();
        const products = await productsCollection.find().toArray();

        const buyersMap = Object.fromEntries(buyers.map(b => [b._id.toString(), b]));
        const productsMap = Object.fromEntries(products.map(p => [p._id.toString(), p]));

        const ordersWithDetails = orders.map(order => {
            const buyer = buyersMap[order.buyer_id.toString()];
            const product = productsMap[order.product_id.toString()];

            return {
                orderId: order._id,
                orderDate: order.order_date,
                quantity: order.quantity,
                buyerName: buyer?.name || "Unknown",
                buyerEmail: buyer?.email || "Unknown",
                productName: product?.name || "Unknown",
                productPrice: product?.price || 0
            };
        });

        console.log(ordersWithDetails.slice(0, 10));
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close();
    }
};

run();
