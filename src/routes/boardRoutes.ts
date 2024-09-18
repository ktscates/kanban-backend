import express from "express";
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController";

const router = express.Router();

router.get("/boards", getBoards);
router.post("/boards", createBoard);
router.get("/boards/:boardName", getBoard);
router.put("/boards/:boardName", updateBoard);
router.delete("/boards/:boardName", deleteBoard);

export default router;
