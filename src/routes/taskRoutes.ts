import express from "express";
import { addTask, updateTask, deleteTask } from "../controllers/taskController";

const router = express.Router();

router.post("/:boardId/columns/:columnId/tasks", addTask);
router.put("/:boardId/columns/:columnId/tasks/:taskId", updateTask);
router.delete("/:boardId/columns/:columnId/tasks/:taskId", deleteTask);

export default router;
