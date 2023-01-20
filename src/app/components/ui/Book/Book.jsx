import React from "react";
import withEditField from "../../hoc/withEditField/withEditField";
import withEditUploadImg from "../../hoc/withEditUploadImg/withEditUploadImg";
import { ReactComponent as Delete } from "../../../../../node_modules/bootstrap-icons/icons/x-circle-fill.svg";
import style from "./book.module.scss";
import BookAuthor from "./BookAuthor";
import BookCover from "./BookCover";
import BookName from "./BookName";

const Book = ({ data, handleDeleteBook }) => {
  const { _id, cover, name, author } = data;

  const BookNameWithEditField = withEditField(BookName);
  const BookAuthorWithEditField = withEditField(BookAuthor);
  const BookCoverWithEditField = withEditUploadImg(BookCover);

  return (
    <div className={style.book}>
      <BookCoverWithEditField {...{ _id, cover }} />

      <div className={style.book_info}>
        <BookNameWithEditField {...{ _id, name }} fieldName="name" />
        <BookAuthorWithEditField {...{ _id, author }} fieldName="author" />
      </div>

      <Delete
        onClick={() => handleDeleteBook(_id)}
        className={style.book_delete}
      />
    </div>
  );
};

export default Book;
