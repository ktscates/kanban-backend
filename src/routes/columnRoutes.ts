import express from "express";
import {
  addColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController";

const router = express.Router();

router.post("/:boardId/columns", addColumn);
router.put("/:boardId/columns/:columnId", updateColumn);
router.delete("/:boardId/columns/:columnId", deleteColumn);

export default router;
