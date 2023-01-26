import React from "react";
// import { DEFAULT_IMG } from "../../../data/defaultImg";
import style from "./book.module.scss";

interface BookCoverProps {
  cover: string;
}

const BookCover: React.FC<BookCoverProps> = ({ cover }) => {
  return (
    <div className={style.book_cover}>
      {/* <img src={cover || DEFAULT_IMG} alt="" /> */}
      <img src={cover} alt="" />
    </div>
  );
};

export default BookCover;
