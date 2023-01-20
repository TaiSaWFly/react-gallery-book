import React from "react";
import style from "./book.module.scss";
import { ReactComponent as NameBook } from "../../../../../node_modules/bootstrap-icons/icons/book-half.svg";

const BookName = ({ name }) => {
  return (
    <div className={style.book_name}>
      <span>
        <NameBook />
      </span>
      {name}
    </div>
  );
};

export default BookName;
