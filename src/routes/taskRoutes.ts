import express from "express";
import {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  getTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/boards/:boardName/columns/:columnName/tasks", getTasks);
router.post("/boards/:boardName/columns/:columnName/tasks", addTask);
router.get("/boards/:boardName/columns/:columnName/tasks/:taskName", getTask);
router.put(
  "/boards/:boardName/columns/:columnName/tasks/:taskName",
  updateTask
);
router.delete(
  "/boards/:boardName/columns/:columnName/tasks/:taskName",
  deleteTask
);

export default router;
