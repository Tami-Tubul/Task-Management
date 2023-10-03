const express = require("express");
const router = express.Router();
const { getAllTasks, getTaskById, addTask, updateTask , deleteTask, changeStatusTask} = require("../controllers/tasksControllers")

router.get("/", getAllTasks);
router.get("/:id", getTaskById);

router.post("/", addTask);
router.post("/:id", changeStatusTask);

router.put("/:id",updateTask);

router.delete("/:id",deleteTask);


module.exports = router;