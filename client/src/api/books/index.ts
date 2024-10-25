import { api } from "config";
import { createUrlParam } from "function";
import { BookModel, CreateBookModel } from "model/books";
import { SearchParamModel } from "model/common";

const books = {
  get: async (r?: SearchParamModel) => {
    const req = createUrlParam(r);
    const response = await api.get(`books${req}`);

    return response.data;
  },

  create: async (data: CreateBookModel) => {
    const response = await api.post(`books`, data);

    return response.data;
  },

  edit: async (data: BookModel) => {
    const response = await api.put(`books`, data);

    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`books`, { data: { id: id } });

    return response.data;
  },
};

export default books;
