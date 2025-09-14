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

    const stats = await users.find({ name: "Ali" }).explain("executionStats");
        console.log(JSON.stringify(stats, null, 2));

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
};

run();
