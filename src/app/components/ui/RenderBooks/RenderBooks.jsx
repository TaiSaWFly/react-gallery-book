import React, { useEffect, useState } from "react";
import style from "./renderBooks.module.scss";
import Book from "../Book/Book";
import { useDispatch, useSelector } from "react-redux";
import {
  createBook,
  deleteBook,
  getBooks,
  loadBooks,
} from "../../../store/slice/books";
import { ReactComponent as AddBook } from "../../../../../node_modules/bootstrap-icons/icons/file-earmark-plus-fill.svg";
import FormBook from "../FormBook/FormBook";

const RenderBooks = () => {
  const [addNewBook, setAddNewBook] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector(getBooks());

  useEffect(() => {
    dispatch(loadBooks());
    // eslint-disable-next-line
  }, []);

  const handleToggleAddNewBook = () => {
    setAddNewBook((prevState) => !prevState);
  };

  const handleCancelAddNewBook = () => {
    setAddNewBook(false);
  };

  const handleDeleteBook = (_id) => {
    dispatch(deleteBook(_id));
  };

  const onSubmit = (data) => {
    dispatch(createBook(data));
    setAddNewBook(false);
  };

  return (
    <div className={style.render_books}>
      <div className={style.render_books__wrapper}>
        {books
          ? books.map((book) => (
              <Book key={book._id} data={book} {...{ handleDeleteBook }} />
            ))
          : "Loading..."}

        <AddBook
          onClick={handleToggleAddNewBook}
          className={
            addNewBook
              ? style.render_books__add_book_active
              : style.render_books__add_book
          }
        />
        {books && books.length === 0 && !addNewBook && (
          <span>Вы можете добавить новую книгу</span>
        )}

        {addNewBook && <FormBook {...{ onSubmit, handleCancelAddNewBook }} />}
      </div>
    </div>
  );
};

export default RenderBooks;
