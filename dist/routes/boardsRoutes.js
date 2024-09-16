"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataUtils_1 = require("../utils/dataUtils");
const router = express_1.default.Router();
// Helper functions
const getBoardIndex = (boardName) => {
    const data = (0, dataUtils_1.readData)();
    return data.boards.findIndex((board) => board.name === boardName);
};
// Get all boards
router.get("/", (req, res) => {
    try {
        const data = (0, dataUtils_1.readData)();
        res.json(data.boards);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get a single board by name
router.get("/:boardName", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const data = (0, dataUtils_1.readData)();
        const board = data.boards.find((board) => board.name === boardName);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(board);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Edit a board
router.put("/:boardName", (req, res) => {
    try {
        const oldBoardName = req.params.boardName;
        const updatedBoard = req.body;
        const data = (0, dataUtils_1.readData)();
        const boardIndex = getBoardIndex(oldBoardName);
        if (boardIndex === -1) {
            return res.status(404).json({ message: "Board not found" });
        }
        data.boards[boardIndex] = Object.assign(Object.assign({}, data.boards[boardIndex]), updatedBoard);
        (0, dataUtils_1.writeData)(data);
        res.status(200).json(data.boards[boardIndex]);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete a board
router.delete("/:boardName", (req, res) => {
    try {
        const boardName = req.params.boardName;
        const data = (0, dataUtils_1.readData)();
        const boardIndex = getBoardIndex(boardName);
        if (boardIndex === -1) {
            return res.status(404).json({ message: "Board not found" });
        }
        data.boards.splice(boardIndex, 1);
        (0, dataUtils_1.writeData)(data);
        res.status(204).send();
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.default = router;
