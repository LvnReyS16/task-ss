const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { databaseURL } = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

// Load routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => console.log(`Server Port: 3000`));
  })
  .catch((error) => console.log(`${error} did not connect`));
