import { IBook } from "./../../models/Book";
import { IEditFormData, IFormData } from "./../../models/FormData";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import localStorageService from "../../services/localStorage.service";

interface BooksState {
  entities: IBook[] | null;
  isLoading: boolean;
}

const initialState: BooksState = {
  entities: null,
  isLoading: true,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    booksRequested: (state) => {
      state.isLoading = true;
    },
    booksReceved: (state, action: PayloadAction<IBook[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    booksCreated: (state) => {
      state.isLoading = true;
    },
    booksDeleted: (state) => {
      state.isLoading = true;
    },

    booksUpdated: (state) => {
      state.isLoading = true;
    },
  },
});

const { actions, reducer: booksReducer } = booksSlice;
const {
  booksRequested,
  booksReceved,
  booksCreated,
  booksDeleted,
  booksUpdated,
} = actions;

export const loadBooks = () => (dispatch: Dispatch) => {
  dispatch(booksRequested());
  const data = localStorageService.fromStorage();
  dispatch(booksReceved(data));
};

export const createBook =
  (payload: IFormData) => (dispatch: Dispatch, getState: any) => {
    dispatch(booksCreated());
    const { entities } = getState().books;
    const newData = {
      _id: nanoid(),
      ...payload,
    };
    const dataToLocalStorage = [...entities, newData];

    localStorageService.toStorage(dataToLocalStorage);
    dispatch(booksRequested());
    const data = localStorageService.fromStorage();
    dispatch(booksReceved(data));
  };

export const deleteBook =
  (payload: string) => (dispatch: Dispatch, getState: any) => {
    dispatch(booksDeleted());
    const { entities } = getState().books;
    const dataToLocalStorage = entities.filter((e: IBook) => e._id !== payload);

    localStorageService.toStorage(dataToLocalStorage);
    dispatch(booksRequested());
    const data = localStorageService.fromStorage();
    dispatch(booksReceved(data));
  };

export const updateBook =
  (payload: IEditFormData) => (dispatch: Dispatch, getState: any) => {
    dispatch(booksUpdated());
    const { entities } = getState().books;
    const dataToLocalStorage = entities.map((e: IBook) =>
      e._id === payload._id ? { ...e, ...payload } : { ...e }
    );

    localStorageService.toStorage(dataToLocalStorage);
    dispatch(booksRequested());
    const data = localStorageService.fromStorage();
    dispatch(booksReceved(data));
  };

export const getBooks = () => (state: any) => state.books.entities;

export default booksReducer;
