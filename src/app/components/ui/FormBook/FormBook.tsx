import React, { useEffect, useState } from "react";
import { IFieldData } from "../../../models/FieldData";
import { IFormData, IFormErrors } from "../../../models/FormData";
import { addNewBookSchema } from "../../../utils/yupSchema";
import TextField from "../../common/TextField";
import UploadImage from "../../common/UploadImage";
import style from "./formBook.module.scss";

interface FormBookProps {
  onSubmit: (data: IFormData) => void;
  handleCancelAddNewBook: () => void;
}

const initialState: IFormData = {
  cover: "",
  name: "",
  author: "",
};

const FormBook: React.FC<FormBookProps> = ({
  onSubmit,
  handleCancelAddNewBook,
}) => {
  const [data, setData] = useState<IFormData>(initialState);
  const [errors, setErrors] = useState<IFormErrors>({});

  useEffect(() => {
    validate();
    // eslint-disable-next-line
  }, [data]);

  const handleChange = (target: IFieldData) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleCancelEdit: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    handleCancelAddNewBook();
    setData(initialState);
    setErrors({});
  };

  const validate = (): boolean => {
    addNewBookSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form_book}>
      <div className={style.form_book__cover}>
        <UploadImage
          label="Можно добавить обложку"
          name="cover"
          onChange={handleChange}
        />
      </div>
      <TextField
        label="Название книги"
        name="name"
        value={data.name}
        error={errors.name}
        onChange={handleChange}
      />
      <TextField
        label="Автор"
        name="author"
        value={data.author}
        error={errors.author}
        onChange={handleChange}
      />
      <div className={style.form_book__actions}>
        <button disabled={!isValid} className={style.form_book__actions_add}>
          Добавить
        </button>
        <button
          onClick={handleCancelEdit}
          className={style.form_book__actions_cancel}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default FormBook;
