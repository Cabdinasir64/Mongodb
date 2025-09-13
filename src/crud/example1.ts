import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/"
const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();

    // making database
    const database1 = client.db("database1");
    const database2 = client.db("database2");

    // making collections
    const collection1 = database1.collection("collection1");
    const collection2 = database2.collection("collection2");
    const db1col2 = database1.collection("collection2");
    await db1col2.insertOne({ name: "temp" });
    const db1col3 = database1.collection("collection3");
    await db1col3.insertOne({ name: "ali" });

    // Inserting a document into collection1
    const doc1 = { name: "Alice", age: 30, city: "New York", status: "active", score: 85, email: "alice@example.com" };
    const doc3 = { name: "Alice", age: 30, city: "New York", status: "active", score: 85, email: "alice@example.com" };
    await collection1.insertOne(doc1);
    await collection1.insertOne(doc3);

    // Inserting a document into collection2
    const doc2 = { name: "Bob", age: 25, city: "Los Angeles", status: "inactive", score: 90, email: "bob@example.com" };
    await collection2.insertOne(doc2);

    // delete database2
    await database2.dropDatabase()

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

run();
