import express, { Request, Response, NextFunction } from "express";
import boardRoutes from "./routes/boardRoutes";
import columnRoutes from "./routes/columnRoutes";
import taskRoutes from "./routes/taskRoutes";
import subtaskRoutes from "./routes/subtaskRoutes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());

// Routes
app.use("/boards", boardRoutes);
app.use("/boards", columnRoutes);
app.use("/boards", taskRoutes);
app.use("/boards", subtaskRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
