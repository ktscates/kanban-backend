import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

export const addColumn = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const newColumn = req.body;

  if (!data.boards[boardId]) {
    return res.status(404).json({ message: "Board not found" });
  }

  data.boards[boardId].columns.push(newColumn);
  writeData(data);
  res.status(201).json(newColumn);
};

export const updateColumn = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const updatedColumn = req.body;

  if (!data.boards[boardId] || !data.boards[boardId].columns[columnId]) {
    return res.status(404).json({ message: "Board or column not found" });
  }

  data.boards[boardId].columns[columnId] = {
    ...data.boards[boardId].columns[columnId],
    ...updatedColumn,
  };
  writeData(data);
  res.json(data.boards[boardId].columns[columnId]);
};

export const deleteColumn = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);

  if (!data.boards[boardId] || !data.boards[boardId].columns[columnId]) {
    return res.status(404).json({ message: "Board or column not found" });
  }

  data.boards[boardId].columns.splice(columnId, 1);
  writeData(data);
  res.status(204).send();
};
