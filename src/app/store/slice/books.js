import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import localStorageService from "../../services/localStorage.service";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    entities: null,
    isLoading: true,
  },
  reducers: {
    booksRequested: (state) => {
      state.isLoading = true;
    },
    booksReceved: (state, action) => {
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

export const loadBooks = () => (dispatch) => {
  dispatch(booksRequested());
  const data = localStorageService.fromStorage();
  dispatch(booksReceved(data));
};

export const createBook = (payload) => (dispatch, getState) => {
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

export const deleteBook = (payload) => (dispatch, getState) => {
  dispatch(booksDeleted());
  const { entities } = getState().books;
  const dataToLocalStorage = entities.filter((e) => e._id !== payload);

  localStorageService.toStorage(dataToLocalStorage);
  dispatch(booksRequested());
  const data = localStorageService.fromStorage();
  dispatch(booksReceved(data));
};

export const updateBook = (payload) => (dispatch, getState) => {
  dispatch(booksUpdated());
  const { entities } = getState().books;
  const dataToLocalStorage = entities.map((e) =>
    e._id === payload._id ? { ...e, ...payload } : { ...e }
  );

  localStorageService.toStorage(dataToLocalStorage);
  dispatch(booksRequested());
  const data = localStorageService.fromStorage();
  dispatch(booksReceved(data));
};

export const getBooks = () => (state) => state.books.entities;

export default booksReducer;
