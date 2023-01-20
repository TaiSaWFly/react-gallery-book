import React from "react";
import { DEFAULT_IMG } from "../../../data/defaultImg";
import style from "./book.module.scss";

const BookCover = ({ cover }) => {
  return (
    <div className={style.book_cover}>
      <img src={cover || DEFAULT_IMG} alt="" />
    </div>
  );
};

export default BookCover;
