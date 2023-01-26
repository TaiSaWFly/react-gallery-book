import React, { useState } from "react";
import { ReactComponent as Edit } from "../../../../../node_modules/bootstrap-icons/icons/pencil-fill.svg";
import style from "./withEditUploadImg.module.scss";
import UploadImage from "../../common/UploadImage";
import EditFieldActions from "../../ui/EditFieldActions/EditFieldActions";
import { IFieldData } from "../../../models/FieldData";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { updateBook } from "../../../store/slice/books";

interface WithEditUploadImgProps {
  _id: string;
  cover: string;
}

const withEditUploadImg =
  <T extends object>(
    Component: React.ComponentType<T>
  ): React.FC<T & WithEditUploadImgProps> =>
  ({ ...props }: WithEditUploadImgProps) => {
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({ ...props, cover: "" });

    const handleChange = (target: IFieldData) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    };

    const handleToggleEdit = (): void => {
      setEdit((prevState) => !prevState);
    };

    const handleCancelEdit = (): void => {
      setEdit(false);
      setData({ ...props, cover: "" });
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      dispatch(updateBook(data));
      setEdit(false);
    };

    return (
      <div className={style.with_edit_uploadimg}>
        <Edit
          onClick={handleToggleEdit}
          className={style.with_edit_uploadimg__action}
        />
        {!edit ? (
          <Component {...(props as T)} />
        ) : (
          <div>
            <div className={style.with_edit_uploadimg__field}>
              <UploadImage
                label="Изменить"
                name="cover"
                onChange={handleChange}
              />
            </div>

            <EditFieldActions {...{ handleSubmit, handleCancelEdit }} />
          </div>
        )}
      </div>
    );
  };

export default withEditUploadImg;
