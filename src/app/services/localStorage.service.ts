import { IBook } from "../models/Book";

const KEY_BOOKS = "books";

const localStorageService = {
  fromStorage: (): IBook[] => {
    return JSON.parse(localStorage.getItem(KEY_BOOKS) as string);
  },
  toStorage: (value: IBook[]) => {
    localStorage.setItem(KEY_BOOKS, JSON.stringify(value));
  },
};

export default localStorageService;
