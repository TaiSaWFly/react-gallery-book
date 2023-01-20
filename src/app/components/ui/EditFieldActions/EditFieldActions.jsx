import React from "react";
import style from "./editFieldActions.module.scss";
import { ReactComponent as Сheck } from "../../../../../node_modules/bootstrap-icons/icons/check-circle-fill.svg";
import { ReactComponent as Cancel } from "../../../../../node_modules/bootstrap-icons/icons/c-circle-fill.svg";

const EditFieldActions = ({ isValid, handleSubmit, handleCancelEdit }) => {
  return (
    <div className={style.edit_field_actions}>
      <Сheck
        onClick={handleSubmit}
        className={
          isValid !== undefined
            ? !isValid
              ? style.edit_field_actions_notcheck
              : style.edit_field_actions_check
            : style.edit_field_actions_check
        }
      />
      <Cancel
        onClick={handleCancelEdit}
        className={style.edit_field_actions_cancel}
      />
    </div>
  );
};

export default EditFieldActions;
