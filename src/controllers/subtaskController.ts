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

// Helper function to get task by name
const getTaskByName = (column: any, taskName: string) => {
  return column.tasks.find((t: any) => t.title === taskName);
};

// Get all subtasks in a specific task of a column and board
export const getSubtasks = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const task = getTaskByName(column, req.params.taskName);

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task.subtasks);
};

// Get a specific subtask by name in a task of a column and board
export const getSubtask = (req: Request, res: Response) => {
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const task = getTaskByName(column, req.params.taskName);
  const subtaskName = req.params.subtaskName;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const subtask = task.subtasks.find((s: any) => s.title === subtaskName);

  if (!subtask) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  res.json(subtask);
};

// Add a new subtask to a specific task in a column of a board
export const addSubtask = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const task = getTaskByName(column, req.params.taskName);
  const newSubtask = req.body;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.subtasks.push(newSubtask);
  writeData(data);
  res.status(201).json(newSubtask);
};

// Update a specific subtask by name in a task of a column and board
export const updateSubtask = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const task = getTaskByName(column, req.params.taskName);
  const subtaskName = req.params.subtaskName;
  const updatedSubtask = req.body;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const subtask = task.subtasks.find((s: any) => s.title === subtaskName);

  if (!subtask) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  Object.assign(subtask, updatedSubtask);
  writeData(data);
  res.json(subtask);
};

// Delete a specific subtask by name in a task of a column and board
export const deleteSubtask = (req: Request, res: Response) => {
  const data = readData();
  const board = getBoardByName(req.params.boardName);
  const column = getColumnByName(board, req.params.columnName);
  const task = getTaskByName(column, req.params.taskName);
  const subtaskName = req.params.subtaskName;

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  if (!column) {
    return res.status(404).json({ message: "Column not found" });
  }
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const subtaskIndex = task.subtasks.findIndex(
    (s: any) => s.title === subtaskName
  );

  if (subtaskIndex === -1) {
    return res.status(404).json({ message: "Subtask not found" });
  }

  task.subtasks.splice(subtaskIndex, 1);
  writeData(data);
  res.status(204).send();
};
