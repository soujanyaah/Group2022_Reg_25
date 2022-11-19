const connectDB = require("./config/database");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/user-route");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
