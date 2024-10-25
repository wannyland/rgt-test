import { BookListModel } from "model/books";
import { GenericResponse } from "model/common";

export const returnSuccessBookList = {
  select: (res: GenericResponse<BookListModel>) => {
    const data: BookListModel = res.data;

    return data;
  },
};
