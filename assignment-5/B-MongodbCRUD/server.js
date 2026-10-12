const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/assignment7")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

app.post("/students", async (req, res) => {
  const student = await Student.create({
    name: req.body.name,
    age: req.body.age,
    course: req.body.course,
  });

  res.status(201).json(student);
});

app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age,
      course: req.body.course,
    },
    { returnDocument: "after" },
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

app.delete("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
