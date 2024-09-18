import express from "express";
import {
  addSubtask,
  updateSubtask,
  deleteSubtask,
  getSubtasks,
  getSubtask,
} from "../controllers/subtaskController";

const router = express.Router();

router.get(
  "/boards/:boardName/columns/:columnName/tasks/:taskName/subtasks",
  getSubtasks
);
router.post(
  "/boards/:boardName/columns/:columnName/tasks/:taskName/subtasks",
  addSubtask
);
router.get(
  "/boards/:boardName/columns/:columnName/tasks/:taskName/subtasks/:subtaskName",
  getSubtask
);
router.put(
  "/boards/:boardName/columns/:columnName/tasks/:taskName/subtasks/:subtaskName",
  updateSubtask
);
router.delete(
  "/boards/:boardName/columns/:columnName/tasks/:taskName/subtasks/:subtaskName",
  deleteSubtask
);

export default router;
