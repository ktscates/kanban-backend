import express from "express";
import {
  getColumns,
  getColumn,
  addColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController";

const router = express.Router();

router.get("/boards/:boardName/columns", getColumns);
router.post("/boards/:boardName/columns", addColumn);
router.get("/boards/:boardName/columns/:columnName", getColumn);
router.put("/boards/:boardName/columns/:columnName", updateColumn);
router.delete("/boards/:boardName/columns/:columnName", deleteColumn);

export default router;
