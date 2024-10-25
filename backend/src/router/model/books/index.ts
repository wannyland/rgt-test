// 기본 책 모델
export interface BookModel {
  id: number;
  name: string;
  author: string;
  count: number;
}

// 책 등록 모델
export type CreateBookModel = Omit<BookModel, "id">;
