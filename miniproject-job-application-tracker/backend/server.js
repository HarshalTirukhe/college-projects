const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5000;

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "job_application_tracker";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Application Tracker API is running");
});

async function startServer() {
  await client.connect();

  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

app.post("/api/applications", async (req, res) => {
  try {
    const db = client.db(dbName);

    const application = {
      company: req.body.company,
      position: req.body.position,
      location: req.body.location,
      status: req.body.status,
      appliedDate: req.body.appliedDate,
    };

    const result = await db.collection("applications").insertOne(application);

    res.status(201).json({
      message: "Application created successfully",
      application: {
        _id: result.insertedId,
        ...application,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create application",
    });
  }
});

startServer();