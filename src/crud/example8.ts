import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const database1 = client.db("database1");

        await database1.collection("example8").drop().catch(() => { });

        await database1.createCollection("example8", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "age", "email", "city", "status", "hobbies"],
                    additionalProperties: false,
                    properties: {
                        name: { bsonType: "string", minLength: 2, maxLength: 50, description: "Name waa string 2-50 chars" },
                        age: { bsonType: "int", minimum: 0, maximum: 120, description: "Age waa int 0-120" },
                        email: { bsonType: "string", pattern: "^.+@.+\\..+$", description: "Email sax ah waa loo baahan yahay" },
                        city: { bsonType: "string", description: "City waa string" },
                        dateOfBirth: { bsonType: "date", description: "Date of Birth waa date" },
                        status: { enum: ["active", "inactive"], description: "Status waa active ama inactive" },
                        hobbies: {
                            bsonType: "array",
                            items: { bsonType: "string" },
                            minItems: 1,
                            uniqueItems: true,
                            description: "Hobbies waa array of unique strings"
                        }
                    }
                }
            }
        });

        const collection = database1.collection("example8");

        const validDoc = await collection.insertOne({
            name: "Ali",
            age: 25,
            email: "ali@example.com",
            city: "Mogadishu",
            dateOfBirth: new Date("1998-01-10"),
            status: "active",
            hobbies: ["reading", "coding"]
        });
        console.log("✅ Valid document inserted:", validDoc.insertedId);

        const testDocs = [
            {
                name: "Omar",
                age: 30,
                city: "Hargeisa",
                dateOfBirth: new Date("1993-05-05"),
                status: "active",
                hobbies: ["swimming", "reading"]
            },
            {
                name: "Asha",
                age: -5,
                email: "asha@example.com",
                city: "Mogadishu",
                dateOfBirth: new Date("2000-01-01"),
                status: "inactive",
                hobbies: ["painting"]
            },
            {
                name: "Hassan",
                age: 40,
                email: "hassan@example.com",
                city: "Hargeisa",
                dateOfBirth: new Date("1983-03-03"),
                status: "active",
                hobbies: ["football", "football"]
            },
            {
                name: "Fatima",
                age: 28,
                email: "fatima.example.com",
                city: "Mogadishu",
                dateOfBirth: new Date("1995-09-09"),
                status: "active",
                hobbies: ["reading"]
            }
        ];

        for (const doc of testDocs) {
            try {
                await collection.insertOne(doc);
            } catch (err) {
                console.error("❌ Insert failed due to validation:", err);
            }
        }

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
};

run();
