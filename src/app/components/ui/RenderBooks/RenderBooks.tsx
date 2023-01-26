import { useEffect, useState } from "react";
import style from "./renderBooks.module.scss";
import Book from "../Book/Book";
import { ReactComponent as AddBook } from "../../../../../node_modules/bootstrap-icons/icons/file-earmark-plus-fill.svg";
import FormBook from "../FormBook/FormBook";
import { IFormData } from "../../../models/FormData";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createBook,
  deleteBook,
  getBooks,
  loadBooks,
} from "../../../store/slice/books";
import { IBook } from "../../../models/Book";

const RenderBooks: React.FC = () => {
  const [addNewBook, setAddNewBook] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const books: IBook[] = useAppSelector(getBooks());

  useEffect(() => {
    dispatch(loadBooks());
    // eslint-disable-next-line
  }, []);

  const handleToggleAddNewBook = (): void => {
    setAddNewBook((prevState) => !prevState);
  };

  const handleCancelAddNewBook = (): void => {
    setAddNewBook(false);
  };

  const handleDeleteBook = (_id: string): void => {
    dispatch(deleteBook(_id));
  };

  const onSubmit = (data: IFormData) => {
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
