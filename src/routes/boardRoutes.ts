import express from "express";
import {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController";

const router = express.Router();

router.get("/", getBoards);
router.get("/:boardId", getBoard);
router.post("/", addBoard);
router.put("/:boardId", updateBoard);
router.delete("/:boardId", deleteBoard);

export default router;
