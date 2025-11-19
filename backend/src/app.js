const express = require("express");
const cors = require("cors");
const candidateRoutes = require("./routes/candidate.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/candidates", candidateRoutes);

// Global Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
