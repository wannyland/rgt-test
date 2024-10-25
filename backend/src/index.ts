import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
const indexRouter = require("./router");
const app = express();

const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

app.use("/api", indexRouter);

// 404 Error Handling
app.use((req: Request, res: Response) => {
  return res
    .status(404)
    .json({ code: 404, message: "지원하지 않는 API URI입니다." });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
