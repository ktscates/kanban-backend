import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

const getBoardByName = (name: string) => {
  const data = readData();
  return data.boards.find((b: any) => b.name === name);
};

export const getBoards = (req: Request, res: Response) => {
  const data = readData();
  res.json(data.boards);
  console.log("boards", data);
};

export const getBoard = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);
  if (board) {
    res.json(board);
  } else {
    res.status(404).send("Board not found");
  }
};

export const createBoard = (req: Request, res: Response) => {
  const data = readData();
  const newBoard = { name: req.body.name, columns: [] };
  data.boards.push(newBoard);
  writeData(data);
  res.status(201).json(newBoard);
};

export const updateBoard = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  if (board) {
    board.name = req.body.name || board.name;
    writeData(data);
    res.json(board);
  } else {
    res.status(404).send("Board not found");
  }
};

export const deleteBoard = (req: Request, res: Response) => {
  const data = readData();
  const boardIndex = data.boards.findIndex(
    (b: any) => b.name === req.params.boardName
  );
  if (boardIndex !== -1) {
    data.boards.splice(boardIndex, 1);
    writeData(data);
    res.status(204).send();
  } else {
    res.status(404).send("Board not found");
  }
};
