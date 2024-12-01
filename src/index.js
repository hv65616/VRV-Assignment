const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
