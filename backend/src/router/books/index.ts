import { Request, Response, Router } from "express";
import {
  filledParam,
  ResponseHandlerByBoolean,
  ResponseHandlerByNumber,
} from "function";
import { BookModel, CreateBookModel } from "router/model/books";
import { CommonParamModel } from "router/model/common";
import { delBook, getBooks, insBook, updBook } from "sql/books";

const booksRouter = Router();

//책 목록 불러오기
booksRouter.get("/", async (req: Request, res: Response) => {
  const param: Partial<CommonParamModel> = filledParam(req.query);
  try {
    const books = await getBooks(param);

    // 클라이언트에 JSON 결과 반환
    return res.json({ code: 200, data: books, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//책 등록하기
booksRouter.post("/", async (req: Request, res: Response) => {
  const param: CreateBookModel = {
    ...req.body,
  };
  try {
    const result = await insBook(param);

    return res.json(ResponseHandlerByNumber(result));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//책 수정하기
booksRouter.put("/", async (req: Request, res: Response) => {
  const data: BookModel = req.body;
  try {
    const result = await updBook(data);

    return res.json(ResponseHandlerByNumber(result));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//책 삭제하기
booksRouter.delete("/", async (req: Request, res: Response) => {
  const id = req.body.id;
  const result = await delBook(id);

  return res.json(ResponseHandlerByBoolean(result));
});
export default booksRouter;
