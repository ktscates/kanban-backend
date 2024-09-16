import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

export const getBoards = (req: Request, res: Response) => {
  const data = readData();
  res.json(data.boards);
};

export const getBoard = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);

  if (!data.boards[boardId]) {
    return res.status(404).json({ message: "Board not found" });
  }

  res.json(data.boards[boardId]);
};

export const addBoard = (req: Request, res: Response) => {
  const data = readData();
  const newBoard = req.body;
  data.boards.push(newBoard);
  writeData(data);
  res.status(201).json(newBoard);
};

export const updateBoard = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const updatedBoard = req.body;

  if (!data.boards[boardId]) {
    return res.status(404).json({ message: "Board not found" });
  }

  data.boards[boardId] = { ...data.boards[boardId], ...updatedBoard };
  writeData(data);
  res.json(data.boards[boardId]);
};

export const deleteBoard = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);

  if (!data.boards[boardId]) {
    return res.status(404).json({ message: "Board not found" });
  }

  data.boards.splice(boardId, 1);
  writeData(data);
  res.status(204).send();
};
