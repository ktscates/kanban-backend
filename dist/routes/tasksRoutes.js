"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataUtils_1 = require("../utils/dataUtils");
const router = express_1.default.Router();
// Helper functions
const getBoard = (boardName) => {
    const data = (0, dataUtils_1.readData)();
    return data.boards.find((board) => board.name === boardName);
};
const getColumn = (board, columnName) => {
    return board.columns.find((col) => col.name === columnName);
};
const getTask = (column, taskTitle) => {
    return column.tasks.find((t) => t.title === taskTitle);
};
// Create a new task in a board
router.post("/:boardName/tasks", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const { columnName, task } = req.body;
        const data = (0, dataUtils_1.readData)();
        const board = getBoard(boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        const column = getColumn(board, columnName);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        column.tasks.push(task);
        (0, dataUtils_1.writeData)(data);
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Edit a task
router.put("/:boardName/columns/:columnName/tasks/:taskTitle", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const columnName = req.params.columnName;
        const oldTaskTitle = req.params.taskTitle;
        const updatedTask = req.body;
        const data = (0, dataUtils_1.readData)();
        const board = getBoard(boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        const column = getColumn(board, columnName);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        const taskIndex = column.tasks.findIndex((t) => t.title === oldTaskTitle);
        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }
        column.tasks[taskIndex] = Object.assign(Object.assign({}, column.tasks[taskIndex]), updatedTask);
        (0, dataUtils_1.writeData)(data);
        res.status(200).json(column.tasks[taskIndex]);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete a task
router.delete("/:boardName/columns/:columnName/tasks/:taskTitle", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const columnName = req.params.columnName;
        const taskTitle = req.params.taskTitle;
        const data = (0, dataUtils_1.readData)();
        const board = getBoard(boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        const column = getColumn(board, columnName);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        const taskIndex = column.tasks.findIndex((t) => t.title === taskTitle);
        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }
        column.tasks.splice(taskIndex, 1);
        (0, dataUtils_1.writeData)(data);
        res.status(204).send();
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Add a subtask to a task
router.post("/:boardName/columns/:columnName/tasks/:taskTitle/subtasks", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const columnName = req.params.columnName;
        const taskTitle = req.params.taskTitle;
        const { subtask } = req.body;
        const data = (0, dataUtils_1.readData)();
        const board = getBoard(boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        const column = getColumn(board, columnName);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        const task = getTask(column, taskTitle);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.subtasks.push(subtask);
        (0, dataUtils_1.writeData)(data);
        res.status(201).json(subtask);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Edit a subtask
router.put("/:boardName/columns/:columnName/tasks/:taskTitle/subtasks/:subtaskTitle", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const columnName = req.params.columnName;
        const taskTitle = req.params.taskTitle;
        const subtaskTitle = req.params.subtaskTitle;
        const updatedSubtask = req.body;
        const data = (0, dataUtils_1.readData)();
        const board = getBoard(boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        const column = getColumn(board, columnName);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        const task = getTask(column, taskTitle);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const subtaskIndex = task.subtasks.findIndex((st) => st.title === subtaskTitle);
        if (subtaskIndex === -1) {
            return res.status(404).json({ message: "Subtask not found" });
        }
        task.subtasks[subtaskIndex] = Object.assign(Object.assign({}, task.subtasks[subtaskIndex]), updatedSubtask);
        (0, dataUtils_1.writeData)(data);
        res.status(200).json(task.subtasks[subtaskIndex]);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete a subtask
router.delete("/:boardName/columns/:columnName/tasks/:taskTitle/subtasks/:subtaskTitle", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const columnName = req.params.columnName;
        const taskTitle = req.params.taskTitle;
        const subtaskTitle = req.params.subtaskTitle;
        const data = (0, dataUtils_1.readData)();
        const board = getBoard(boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        const column = getColumn(board, columnName);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        const task = getTask(column, taskTitle);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const subtaskIndex = task.subtasks.findIndex((st) => st.title === subtaskTitle);
        if (subtaskIndex === -1) {
            return res.status(404).json({ message: "Subtask not found" });
        }
        task.subtasks.splice(subtaskIndex, 1);
        (0, dataUtils_1.writeData)(data);
        res.status(204).send();
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.default = router;
