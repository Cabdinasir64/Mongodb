import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();
    const db = client.db("database1");
    const collection = db.collection("students");
    const ages = await collection
      .find({})
      .map(doc => doc.age)
      .toArray();

    const totalAge = ages.reduce((acc, curr) => acc + curr, 0);
    console.log("Total of all student ages:", totalAge);

    const uniqueBranches = await collection.distinct("branch");
    console.log("Distinct branches:", uniqueBranches);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

run();
