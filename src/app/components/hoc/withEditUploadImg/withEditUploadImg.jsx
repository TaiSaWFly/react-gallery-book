import React, { useState } from "react";
import { ReactComponent as Edit } from "../../../../../node_modules/bootstrap-icons/icons/pencil-fill.svg";
import style from "./withEditUploadImg.module.scss";
import { useDispatch } from "react-redux";
import { updateBook } from "../../../store/slice/books";
import UploadImage from "../../common/UploadImage";
import EditFieldActions from "../../ui/EditFieldActions/EditFieldActions";

const withEditUploadImg =
  (Component) =>
  ({ ...props }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({ ...props, cover: "" });

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
      setData({ ...props, cover: "" });
    };

    const handleSubmit = (e) => {
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
          <Component {...props} />
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
