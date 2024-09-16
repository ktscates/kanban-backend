import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../data/data.json");

export function readData() {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
}

export function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}
