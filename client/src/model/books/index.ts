import { ExpansionResponseModel } from "model/common";

// 기본 책 모델
export interface BookModel {
  id: number;
  name: string;
  author: string;
  count: number;
  registeredAt?: string;
  updatedAt?: string;
}

//책 리스트 모델
export interface BookListModel extends ExpansionResponseModel {
  list: Array<BookModel>;
}

// 책 등록 모델
export type CreateBookModel = Omit<
  BookModel,
  "id" | "registeredAt" | "updatedAt"
>;
