import { api } from "config";
import { createUrlParam } from "function";
import { CreateBookModel } from "model/books";
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
};

export default books;
