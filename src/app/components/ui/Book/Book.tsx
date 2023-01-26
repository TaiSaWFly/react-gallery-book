import { IBook } from "../../../models/Book";
import style from "./book.module.scss";
import { ReactComponent as Delete } from "../../../../../node_modules/bootstrap-icons/icons/x-circle-fill.svg";
import BookAuthor from "./BookAuthor";
import BookCover from "./BookCover";
import BookName from "./BookName";
import withEditField, {
  FieldNameVariant,
} from "../../hoc/withEditField/withEditField";
import withEditUploadImg from "../../hoc/withEditUploadImg/withEditUploadImg";

interface BookProps {
  data: IBook;
  handleDeleteBook: (_id: string) => void;
}

const Book: React.FC<BookProps> = ({ data, handleDeleteBook }) => {
  const { _id, cover, name, author } = data;

  const BookNameWithEditField = withEditField(BookName);
  const BookAuthorWithEditField = withEditField(BookAuthor);
  const BookCoverWithEditField = withEditUploadImg(BookCover);

  return (
    <div className={style.book}>
      <BookCoverWithEditField {...{ _id, cover }} />

      <div className={style.book_info}>
        <BookNameWithEditField
          {...{ _id, name }}
          fieldName={FieldNameVariant.name}
        />
        <BookAuthorWithEditField
          {...{ _id, author }}
          fieldName={FieldNameVariant.author}
        />
      </div>

      <Delete
        onClick={() => handleDeleteBook(_id)}
        className={style.book_delete}
      />
    </div>
  );
};

export default Book;
