import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const port = process.env.PORT || 3000;
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(cors());

async function run() {
  const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Create db and collection
    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    // Create job
    app.post("/api/post-job", async (req, res) => {
      try {
        const body = req.body;
        body.createAt = new Date();

        const result = await jobsCollections.insertOne(body);

        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(404).send({
            message: "Cannot insert! Try again later",
            status: false,
          });
        }
      } catch (error) {
        console.error("Error in post-job route:", error);
        return res.status(500).send({
          message: "Internal server error",
          status: false,
        });
      }
    });

    // Update job
    app.patch("/api/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;

      const filter = { _id: new ObjectId(id) };

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...jobData,
        },
      };

      const result = await jobsCollections.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send(result);
    });

    // get all jobs
    app.get("/api/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollections.find({}).toArray();
        res.send(jobs);
      } catch (error) {
        console.error("Error in all-jobs route:", error);
        return res.status(500).send({
          message: "Internal server error",
          status: false,
        });
      }
    });

    // get single job using id
    app.get("/api/all-jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const job = await jobsCollections.findOne({
          _id: new ObjectId(id),
        });

        res.send(job);
      } catch (error) {
        console.error("Error in ,my single job route:", error);
        return res.status(500).send({
          message: "Internal server error",
          status: false,
        });
      }
    });

    // get jobs based on mail

    app.get("/api/myJobs/:email", async (req, res) => {
      try {
        const jobs = await jobsCollections
          .find({ postedBy: req.params.email })
          .toArray();

        res.send(jobs);
      } catch (error) {
        console.error("Error in ,my jobs/email route:", error);
        return res.status(500).send({
          message: "Internal server error",
          status: false,
        });
      }
    });

    // Delete a job

    app.delete("/api/job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };

        const result = await jobsCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error("Error in delete route:", error);
        return res.status(500).send({
          message: "Internal server error",
          status: false,
        });
      }
    });

    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    // Start the Express server after all routes are set up and the DB is connected
    app.listen(port, () => {
      console.log(`Server Running ${port}`);
    });
  } catch (error) {
    console.error("Error in MongoDB connection:", error);
  }
}

run().catch(console.dir);
