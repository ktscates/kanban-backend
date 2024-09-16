import express from "express";
import {
  addSubtask,
  updateSubtask,
  deleteSubtask,
} from "../controllers/subtaskController";

const router = express.Router();

router.post("/:boardId/columns/:columnId/tasks/:taskId/subtasks", addSubtask);
router.put(
  "/:boardId/columns/:columnId/tasks/:taskId/subtasks/:subtaskId",
  updateSubtask
);
router.delete(
  "/:boardId/columns/:columnId/tasks/:taskId/subtasks/:subtaskId",
  deleteSubtask
);

export default router;
