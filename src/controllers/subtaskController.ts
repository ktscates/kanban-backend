import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";

export const addSubtask = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const taskId = parseInt(req.params.taskId);
  const newSubtask = req.body;

  if (
    !data.boards[boardId] ||
    !data.boards[boardId].columns[columnId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId]
  ) {
    return res
      .status(404)
      .json({ message: "Board, column, or task not found" });
  }

  data.boards[boardId].columns[columnId].tasks[taskId].subtasks.push(
    newSubtask
  );
  writeData(data);
  res.status(201).json(newSubtask);
};

export const updateSubtask = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const taskId = parseInt(req.params.taskId);
  const subtaskId = parseInt(req.params.subtaskId);
  const updatedSubtask = req.body;

  if (
    !data.boards[boardId] ||
    !data.boards[boardId].columns[columnId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskId]
  ) {
    return res
      .status(404)
      .json({ message: "Board, column, task, or subtask not found" });
  }

  data.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskId] = {
    ...data.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskId],
    ...updatedSubtask,
  };
  writeData(data);
  res.json(
    data.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskId]
  );
};

export const deleteSubtask = (req: Request, res: Response) => {
  const data = readData();
  const boardId = parseInt(req.params.boardId);
  const columnId = parseInt(req.params.columnId);
  const taskId = parseInt(req.params.taskId);
  const subtaskId = parseInt(req.params.subtaskId);

  if (
    !data.boards[boardId] ||
    !data.boards[boardId].columns[columnId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId] ||
    !data.boards[boardId].columns[columnId].tasks[taskId].subtasks[subtaskId]
  ) {
    return res
      .status(404)
      .json({ message: "Board, column, task, or subtask not found" });
  }

  data.boards[boardId].columns[columnId].tasks[taskId].subtasks.splice(
    subtaskId,
    1
  );
  writeData(data);
  res.status(204).send();
};
