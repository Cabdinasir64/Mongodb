import { MongoClient } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();

        const db = client.db("database1");
        const studentsCollection = db.collection("students");


        const BATCH_SIZE = 10000;
        for (let batch = 0; batch < 100; batch++) {
            const documents = [];
            for (let i = 1; i <= BATCH_SIZE; i++) {
                const id = batch * BATCH_SIZE + i;
                documents.push({
                    email: `student${id}@school.com`,
                    name: `Student ${id}`,
                    age: Math.floor(Math.random() * 10) + 15,
                    grade: `Grade ${Math.floor(Math.random() * 6) + 7}`,
                    subjects: ["Math", "Physics", "Chemistry", "English", "Biology"].sort(() => 0.5 - Math.random()).slice(0, 3),
                    branch: `Branch ${Math.floor(Math.random() * 5) + 1}`,
                    info: {
                        address: `Address ${id}`,
                        phone: `+1234567${id}`,
                        parentName: `Parent ${id}`
                    }
                });
            }
            await studentsCollection.insertMany(documents);
            console.log(`Inserted batch ${batch + 1}`);
        }

        console.log("Finished inserting 1,000,000 students");

        const aggBranch = [
            { $group: { _id: "$branch", totalStudents: { $sum: 1 } } },
            { $sort: { totalStudents: -1 } }
        ];
        const branchResults = await studentsCollection.aggregate(aggBranch).toArray();
        console.log("Students per branch:");
        console.table(branchResults);

        const aggGradeAge = [
            { $group: { _id: "$grade", avgAge: { $avg: "$age" } } },
            { $sort: { _id: 1 } }
        ];
        const gradeAgeResults = await studentsCollection.aggregate(aggGradeAge).toArray();
        console.log("Average age per grade:");
        console.table(gradeAgeResults);

        const aggSubjects = [
            { $unwind: "$subjects" },
            { $group: { _id: "$subjects", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ];
        const subjectResults = await studentsCollection.aggregate(aggSubjects).toArray();
        console.log("Students per subject:");
        console.table(subjectResults);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
};

run();
