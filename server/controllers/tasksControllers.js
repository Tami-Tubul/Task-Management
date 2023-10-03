const Task = require("../models/TaskModel");

const getAllTasks = async (req, res, next) => {
    try {

        const allTasks = await Task.find({}).sort({ updatedAt: -1 });
        return res.status(200).json({ tasks: allTasks });

    } catch (error) {
        next(error);
    }
}

const getTaskById = async (req, res, next) => {
    try {

        const taskid = req.params.id;
        const task = await Task.findById(taskid).orFail();
        return res.status(200).json(task);

    } catch (error) {
        next(error);
    }
}

const addTask = async (req, res, next) => {
    try {
        const { title } = req.body;
        const existTask = await Task.findOne({ title: title });
        if (existTask) {
            return res.status(400).json({ message: "כבר קיימת משימה כזו " });
        }
        else {
            const task = new Task({
                title: title
            });
            await task.save();

            res.status(201).json({ newTask: task, message: "משימה נוספה לרשימה" })

        }

    } catch (error) {
        next(error);
    }
}


const updateTask = async (req, res, next) => {
    try {
        const taskid = req.params.id;
        const { title } = req.body;

        await Task.findByIdAndUpdate(taskid, { title: title });

        res.status(200).json({ message: "משימה עודכנה" })

    } catch (error) {
        next(error);
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskid = req.params.id;
        await Task.findByIdAndDelete(taskid);

        res.status(200).json({ message: "משימה נמחקה" })

    } catch (error) {
        next(error);
    }
}

const changeStatusTask = async (req, res, next) => {
    try {
        const taskid = req.params.id;
        const taskToChange = await Task.findById(taskid);

        taskToChange.completed = !taskToChange.completed;
        await taskToChange.save();

        if (taskToChange.completed) {
            res.status(200).json({ taskafterchange: taskToChange, message: "משימה הושלמה" });
        }
        else {
            res.status(200).json({ taskafterchange: taskToChange, message: "משימה סומנה כלא הושלמה" });
        }

    } catch (error) {
        next(error);
    }
}


module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask, changeStatusTask };