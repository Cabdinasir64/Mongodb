import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const database1 = client.db("database1");


        await database1.createCollection("db1col1", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "age", "email", "city", "dateOfBirth"],
                    properties: {
                        name: { bsonType: "string", description: "Name waa in uu string noqdaa" },
                        age: { bsonType: "int", minimum: 0, description: "Age waa in uu integer noqdaa" },
                        email: { bsonType: "string", pattern: "^.+@.+\\..+$", description: "Email sax ah waa loo baahan yahay", },
                        city: { bsonType: "string", description: "City waa in uu string noqdaa" },
                        dateOfBirth: { bsonType: "date", description: "Date of Birth waa in uu date noqdaa" }
                    }
                }
            }
        });

        const db1col1 = database1.collection("db1col1");

        const insertResult = await db1col1.insertOne({
            name: "Ali",
            age: 22,
            email: "ali@example.com",
            city: "Mogadishu",
            dateOfBirth: new Date("2001-05-10")
        });
        console.log("✅ Document inserted:", insertResult.insertedId);

        try {
            await db1col1.insertOne({
                name: "Omar",
                age: 25,
                city: "Hargeisa"
            });
            await db1col1.insertOne({
                name: "Asha",
                age: -5,
                email: "asha@example.com",
                city: "Mogadishu",
                dateOfBirth: new Date("2000-01-01")
            });
            await db1col1.insertOne({
                name: 1,
                age: -5,
                email: "asha@example.com",
                city: "Mogadishu",
                dateOfBirth: new Date("2000-01-01")
            });
        } catch (err) {
            console.error("❌ Insert failed due to validation:", err);
        }

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
};

run();
