const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Rahul", age: 20, course: "BCA" },
    { id: 2, name: "Amit", age: 21, course: "BSc" },
    { id: 3, name: "Priya", age: 20, course: "BCA" }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const student = students.find(
        student => student.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

app.post("/students", (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };

    students.push(student);

    res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
    const student = students.find(
        student => student.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;

    res.json(student);
});

app.delete("/students/:id", (req, res) => {
    const index = students.findIndex(
        student => student.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1);

    res.json(deletedStudent[0]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
