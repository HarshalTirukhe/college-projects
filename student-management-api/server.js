const express = require("express");

const app = express();

app.use(express.json());

let students = [
  {
    id: 1,
    name: "Neha",
    age: 20,
    course: "B.Tech",
    email: "neha@example.com",
  },
  {
    id: 2,
    name: "Rahul",
    age: 19,
    course: "BCA",
    email: "rahul@example.com",
  },
];

let nextStudentId = 3;

app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API!");
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

app.post("/api/students", (req, res) => {
  const studentsToAdd = Array.isArray(req.body) ? req.body : [req.body];

  // Validate students
  for (const student of studentsToAdd) {
    const { name, age, course, email } = student;

    if (!name || !age || !course || !email) {
      return res.status(400).json({
        message: "name, age, course and email are required",
      });
    }
  }

  const newStudents = studentsToAdd.map((student) => ({
    id: nextStudentId++,
    ...student,
  }));

  students.push(...newStudents);

  res.status(201).json(newStudents);
});

app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0],
  });
});

app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, age, course, email } = req.body;

  if (!name || !age || !course || !email) {
    return res.status(400).json({
      message: "name, age, course and email are required",
    });
  }

  student.name = name;
  student.age = age;
  student.course = course;
  student.email = email;

  res.json(student);
});

app.patch("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, age, course, email } = req.body;

  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = age;
  if (course !== undefined) student.course = course;
  if (email !== undefined) student.email = email;

  res.json(student);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
