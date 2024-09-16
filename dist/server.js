"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardsRoutes_1 = __importDefault(require("./routes/boardsRoutes"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Board routes
app.use("/boards", boardsRoutes_1.default);
// Task routes
app.use("/boards", tasksRoutes_1.default);
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
