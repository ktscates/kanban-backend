"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = exports.readData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataPath = path_1.default.join(__dirname, "../data/boards.json");
const readData = () => {
    const jsonData = fs_1.default.readFileSync(dataPath, "utf-8");
    return JSON.parse(jsonData);
};
exports.readData = readData;
const writeData = (data) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};
exports.writeData = writeData;
