import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

// Helper function to get board by name
const getBoardByName = (name: string) => {
  const data = readData();
  return data.boards.find((b: any) => b.name === name);
};

// Helper function to get column by name
const getColumnByName = (board: any, columnName: string) => {
  return board.columns.find((c: any) => c.name === columnName);
};

// Get all tasks in a specific column of a specific board
export const getTasks = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  res.json(column.tasks);
};

// Get a specific task by name in a column of a specific board
export const getTask = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const taskName = req.params.taskName;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  const task = column.tasks.find((t: any) => t.title === taskName);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Add a new task to a specific column in a specific board
export const addTask = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const newTask = req.body;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  column.tasks.push(newTask);
  writeData(data);
  res.status(201).json(newTask);
};

// Update a specific task by name in a column of a specific board
export const updateTask = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const taskName = req.params.taskName;
  const updatedTask = req.body;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  const task = column.tasks.find((t: any) => t.title === taskName);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, updatedTask);
  writeData(data);
  res.json(task);
};

// Delete a specific task by name in a column of a specific board
export const deleteTask = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const taskName = req.params.taskName;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }

  const taskIndex = column.tasks.findIndex((t: any) => t.title === taskName);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  column.tasks.splice(taskIndex, 1);
  writeData(data);
  res.status(204).send();
};
