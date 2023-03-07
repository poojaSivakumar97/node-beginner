const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());

app.use(errorHandler);
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
