import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();

    const db = client.db("database1");
    const users = db.collection("users");


    const bulkData = [];
    for (let i = 0; i < 100000; i++) {
      bulkData.push({
        name: i % 2 === 0 ? "Ali" : "Amina",
        age: Math.floor(Math.random() * 60) + 18,
        email: `user${i}@example.com`,
      });
    }
    await users.insertMany(bulkData);
    console.log("✅ 100,000 users inserted!");

    const query = { name: "Ali" };

    console.time("Query without index");
    const result = await users.find(query).toArray();
    console.timeEnd("Query without index");

    console.log(`📌 Documents found: ${result.length}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
};

run();
