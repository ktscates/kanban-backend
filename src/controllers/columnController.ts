import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

// Helper function to get board by name
const getBoardByName = (name: string) => {
  const data = readData();
  return data.boards.find((b: any) => b.name === name);
};

// Get all columns of a specific board
export const getColumns = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  res.json(board.columns);
  console.log("columns", board.columns);
};

// Get a single column by name from a specific board
export const getColumn = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);
  const columnName = req.params.columnName;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const column = board.columns.find((c: any) => c.name === columnName);

  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  res.json(column);
};

export const addColumn = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const newColumn = req.body;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  // Add new column
  board.columns.push(newColumn);
  writeData(data);
  res.status(201).json(newColumn);
};

export const updateColumn = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const columnName = req.params.columnName;
  const updatedColumn = req.body;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const column = board.columns.find((c: any) => c.name === columnName);
  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  // Update the column properties
  Object.assign(column, updatedColumn);
  writeData(data);
  res.json(column);
};

export const deleteColumn = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const columnName = req.params.columnName;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const columnIndex = board.columns.findIndex(
    (c: any) => c.name === columnName
  );
  if (columnIndex === -1) {
    return res.status(404).json({ message: "Column not found" });
  }

  // Remove the column
  board.columns.splice(columnIndex, 1);
  writeData(data);
  res.status(204).send();
};
