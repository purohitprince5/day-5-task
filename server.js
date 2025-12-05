const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require('dotenv').config();


const userRoutes = require("./routes/userroutes"); // existing user routes
const authRoutes = require("./routes/authroutes"); // new auth routes
const bookRoutes = require("./routes/bookroutes"); // <-- 1. IMPORT BOOK ROUTES

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // <--- Moved express.json() here

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/authroutes")); // <--- login/register here
app.use("/api/books", bookRoutes); // <-- 2. MOUNT BOOK ROUTES AT /api/books

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
