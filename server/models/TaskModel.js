const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = new mongoose.model("tasks",taskSchema);
module.exports = Task;