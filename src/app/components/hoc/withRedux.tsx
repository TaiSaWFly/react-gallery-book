import React from "react";
import store from "../../store/createStore";
import { Provider } from "react-redux";
import localStorageService from "../../services/localStorage.service";
import { books } from "../../data/books";

if (!localStorageService.fromStorage()) {
  localStorageService.toStorage(books);
}

const withRedux =
  <T extends object>(Component: React.ComponentType<T>): React.FC =>
  ({ ...props }) => {
    return (
      <Provider store={store}>
        <Component {...(props as T)} />
      </Provider>
    );
  };

export default withRedux;
