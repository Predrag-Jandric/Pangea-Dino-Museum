import "dotenv/config";
import express from "express";
import cors from "cors";
import dinosaursRouter from "./dinosaurs/dinosaurs.router.js";
import ordersRouter from "./orders/orders.router.js";
import { notFound, errorHandler } from "./errors/index.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/api", (req, res) => {
  res.send("Welcome to DiNostalgia API");
});

// Dino route
app.use("/api/dinosaurs", dinosaursRouter);
// Orders route
app.use("/api/orders", ordersRouter);

// handle Errrors
app.use(notFound);
app.use(errorHandler);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
