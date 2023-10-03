require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
    res.json("API Runnig...")
})

app.use("/api",apiRoutes);

//handle errors
app.get("/", async (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

const connectDB = require("./config/database");
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server run in port ${PORT}`);
})
