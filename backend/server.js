// filepath: server.js
const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

client
  .connect()
  .then(() => {
    db = client.db("dinosaurdb");
    console.log("Connected to MongoDB!");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", async (req, res) => {
  try {
    const collection = db.collection("dinos");
    const dinos = await collection.find().toArray();
    res.status(200).json(dinos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
