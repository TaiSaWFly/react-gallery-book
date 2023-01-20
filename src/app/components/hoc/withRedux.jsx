import React from "react";
import { createStore } from "../../store/createStore";
import { Provider } from "react-redux";
import localStorageService from "../../services/localStorage.service";
import { books } from "../../data/books";

if (!localStorageService.fromStorage()) {
  localStorageService.toStorage(books);
}

const store = createStore();

const withRedux =
  (Component) =>
  ({ ...props }) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

export default withRedux;
