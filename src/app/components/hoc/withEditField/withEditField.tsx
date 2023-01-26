import React, { useState, useEffect } from "react";
import TextField from "../../common/TextField";
import { ReactComponent as Edit } from "../../../../../node_modules/bootstrap-icons/icons/pencil-fill.svg";
import style from "./withEditField.module.scss";
import { IEditFormData, IFormErrors } from "../../../models/FormData";
import { IFieldData } from "../../../models/FieldData";
import EditFieldActions from "../../ui/EditFieldActions/EditFieldActions";
import { returnSchema } from "../../../utils/returnSchema";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { updateBook } from "../../../store/slice/books";

export enum FieldNameVariant {
  name = "name",
  author = "author",
}

interface WithEditFieldProps {
  fieldName: FieldNameVariant;
  _id: string;
  name?: string;
  author?: string;
}

const withEditField =
  <T extends object>(
    Component: React.ComponentType<T>
  ): React.FC<T & WithEditFieldProps> =>
  ({ fieldName, ...props }: WithEditFieldProps) => {
    const dispatch = useAppDispatch();

    const [edit, setEdit] = useState(false);
    const [data, setData] = useState<IEditFormData>(props);
    const [errors, setErrors] = useState<IFormErrors>({});

    const schema = returnSchema(fieldName);

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

    const handleToggleEdit = (): void => {
      setEdit((prevState) => !prevState);
    };

    const handleCancelEdit = () => {
      setEdit(false);
      setData(props);
    };

    const validate = (): boolean => {
      schema
        .validate(data)
        .then(() => setErrors({}))
        .catch((error: IFormErrors) =>
          setErrors({ [error.path]: error.message })
        );
      return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
          <Component {...(props as T)} />
        ) : (
          <form className={style.with_edit_field__form}>
            <TextField
              label="Изменить"
              name={fieldName}
              value={data[fieldName] || ""}
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
