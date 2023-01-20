import React, { useState, useEffect } from "react";
import TextField from "../../common/TextField";
import { ReactComponent as Edit } from "../../../../../node_modules/bootstrap-icons/icons/pencil-fill.svg";
import style from "./withEditField.module.scss";
import { returnSchema } from "../../../utils/returnSchema";
import { useDispatch } from "react-redux";
import { updateBook } from "../../../store/slice/books";
import EditFieldActions from "../../ui/EditFieldActions/EditFieldActions";

const withEditField =
  (Component) =>
  ({ fieldName, ...props }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(props);
    const [errors, setErrors] = useState({});

    const schema = returnSchema(fieldName);

    useEffect(() => {
      validate();
      // eslint-disable-next-line
    }, [data]);

    const handleChange = (target) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    };

    const handleToggleEdit = () => {
      setEdit((prevState) => !prevState);
    };

    const handleCancelEdit = () => {
      setEdit(false);
      setData(props);
    };

    const validate = () => {
      schema
        .validate(data)
        .then(() => setErrors({}))
        .catch((error) => setErrors({ [error.path]: error.message }));
      return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      dispatch(updateBook(data));
      setEdit(false);
    };

    return (
      <div className={style.with_edit_field}>
        <Edit
          onClick={handleToggleEdit}
          className={style.with_edit_field__edit}
        />
        {!edit ? (
          <Component {...props} />
        ) : (
          <form className={style.with_edit_field__form}>
            <TextField
              label="Изменить"
              name={fieldName}
              value={data[fieldName]}
              error={errors[fieldName]}
              onChange={handleChange}
            />

            <EditFieldActions
              {...{ isValid, handleSubmit, handleCancelEdit }}
            />
          </form>
        )}
      </div>
    );
  };

export default withEditField;
