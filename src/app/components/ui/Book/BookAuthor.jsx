import React from "react";
import style from "./book.module.scss";
import { ReactComponent as Person } from "../../../../../node_modules/bootstrap-icons/icons/person.svg";

const BookAuthor = ({ author }) => {
  return (
    <div className={style.book_author}>
      <span>
        <Person />
      </span>
      {author}
    </div>
  );
};

export default BookAuthor;
