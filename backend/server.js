require("dotenv").config(); // Loads the .env file
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

//routes
const dinosaursRoutes = require('./routes/dinosaursRoutes');

//middleware
app.use(cors());
app.use(express.json());

//default route
app.get("/api", (req, res) => {
  res.send("Welcome to DiNostalgia API");
});

//Dino route
app.use("/api/dinosaurs", dinosaursRoutes);
//quiz routes 

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
