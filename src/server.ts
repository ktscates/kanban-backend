import express, { Request, Response, NextFunction } from "express";
import boardRoutes from "./routes/boardRoutes";
import columnRoutes from "./routes/columnRoutes";
import taskRoutes from "./routes/taskRoutes";
import subtaskRoutes from "./routes/subtaskRoutes";
import cors from "cors";

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins for testing
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
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

app.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
