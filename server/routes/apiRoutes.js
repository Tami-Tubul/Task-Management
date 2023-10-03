const express = require("express");
const app = express();

// const authRoutes = require("./authRoutes")
const tasksRoutes = require("./tasksRoutes")

// app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);

module.exports = app;
