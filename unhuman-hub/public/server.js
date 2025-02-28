require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("../routes/auth");
const adminRoutes = require("../routes/admin");
const userRoutes = require("../routes/user");

const app = express();
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000", // React app's URL
    methods: "GET,POST,PUT,DELETE,OPTIONS", 
    allowedHeaders: "Content-Type,Authorization, Access-Control-Allow-Origin", 
    credentials: true, 
    optionSuccessStatus: 200,
  })
);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/unhuman_hub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.IO setup
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // React app's URL
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on port ${PORT}`);
});
