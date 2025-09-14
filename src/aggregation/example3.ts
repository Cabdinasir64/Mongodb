import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("database1");
        const collection = db.collection("students");


    
        const aggregationPipeline = [
            { $addFields: { isAdult: { $gte: ["$age", 18] } } }, 
            {
                $facet: {
                    branchStats: [
                        { $group: { _id: "$branch", totalStudents: { $sum: 1 } } },
                        { $sort: { totalStudents: -1 } }
                    ],
                    gradeStats: [
                        { $group: { _id: "$grade", averageAge: { $avg: "$age" } } },
                        { $project: { _id: 1, averageAge: { $round: ["$averageAge", 2] } } },
                        { $sort: { _id: 1 } }
                    ],
                    subjectStats: [
                        { $unwind: "$subjects" },
                        { $group: { _id: "$subjects", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ]
                }
            }
        ];

        const aggCursor = collection.aggregate(aggregationPipeline);
        const aggResults = await aggCursor.toArray();

        console.log("Advanced Aggregation Results:");
        console.dir(aggResults, { depth: null });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
