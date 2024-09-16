import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

export const addTask = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const newTask = req.body;

  if (!data.boards[boardId] || !data.boards[boardId].columns[columnId]) {
    return res.status(404).json({ message: "Board or column not found" });
  }

  data.boards[boardId].columns[columnId].tasks.push(newTask);
  writeData(data);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const taskId = parseInt(req.params.taskId);
  const updatedTask = req.body;

  if (
    !data.boards[boardId] ||
    !data.boards[boardId].columns[columnId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId]
  ) {
    return res
      .status(404)
      .json({ message: "Board, column, or task not found" });
  }

  data.boards[boardId].columns[columnId].tasks[taskId] = {
    ...data.boards[boardId].columns[columnId].tasks[taskId],
    ...updatedTask,
  };
  writeData(data);
  res.json(data.boards[boardId].columns[columnId].tasks[taskId]);
};

export const deleteTask = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const taskId = parseInt(req.params.taskId);

  if (
    !data.boards[boardId] ||
    !data.boards[boardId].columns[columnId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId]
  ) {
    return res
      .status(404)
      .json({ message: "Board, column, or task not found" });
  }

  data.boards[boardId].columns[columnId].tasks.splice(taskId, 1);
  writeData(data);
  res.status(204).send();
};
