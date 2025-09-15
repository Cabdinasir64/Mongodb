import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://Abdinasir:Nasro616103367@localhost:27017/";
const client = new MongoClient(uri);

const run = async () => {
    try {
        await client.connect();
        const db = client.db("schoolDB");

        const studentsCollection = db.collection("students");
        const coursesCollection = db.collection("courses");
        const enrollmentsCollection = db.collection("enrollments");

        await studentsCollection.deleteMany({});
        await coursesCollection.deleteMany({});
        await enrollmentsCollection.deleteMany({});

        const coursesData = [
            { name: "Coding" },
            { name: "Marketing" },
            { name: "Graphic Design" },
            { name: "UI/UX" },
            { name: "Data Science" }
        ];
        const coursesResult = await coursesCollection.insertMany(coursesData);
        const courseIds = Object.values(coursesResult.insertedIds) as ObjectId[];

        const studentsData = Array.from({ length: 100 }, (_, i) => ({
            name: `Student ${i + 1}`,
            email: `student${i + 1}@example.com`
        }));
        const studentsResult = await studentsCollection.insertMany(studentsData);
        const studentIds = Object.values(studentsResult.insertedIds) as ObjectId[];

        const enrollmentsData: { student_id: ObjectId; course_id: ObjectId }[] = [];

        studentIds.forEach((studentId, index) => {
            const selectedCourses = [
                courseIds[index % courseIds.length],
                courseIds[(index + 1) % courseIds.length]
            ];

            selectedCourses.forEach(courseId => {
                enrollmentsData.push({
                    student_id: studentId,
                    course_id: courseId as ObjectId
                });
            });
        });

        await enrollmentsCollection.insertMany(enrollmentsData);


    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close();
    }
};

run();
