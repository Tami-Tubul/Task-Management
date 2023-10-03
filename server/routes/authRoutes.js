const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers")

router.get("/", authControllers);

module.exports = router;