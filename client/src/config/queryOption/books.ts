import { BookListModel, BookModel } from "model/books";
import { GenericResponse } from "model/common";

// 책 리스트 쿼리 옵션
export const returnSuccessBookList = {
  select: (res: GenericResponse<BookListModel>) => {
    const data = res.data;

    return data;
  },
};

export const returnSuccessBookDetail = {
  select: (res: GenericResponse<BookModel>) => {
    const data = res.data;

    return data;
  },
};
