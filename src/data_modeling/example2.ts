import { MongoClient} from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("shopDB");

        const usersCollection = db.collection("users");
        const productsCollection = db.collection("products");
        const ordersCollection = db.collection("orders");

        const ordersWithDetails = await ordersCollection.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "buyer_id",
                    foreignField: "_id",
                    as: "buyer",
                },
            },
            { $unwind: "$buyer" },          
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                    _id: 0,
                    quantity: 1,
                    order_date: 1,
                    "buyer.name": 1,
                    "buyer.email": 1,
                    "product.name": 1,
                    "product.price": 1,
                },
            },
            { $limit: 10 }, 
        ]).toArray();

        console.table(JSON.stringify(ordersWithDetails, null, 2));
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close();
    }
};

run();
