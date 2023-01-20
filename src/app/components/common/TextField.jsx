import React from "react";
import style from "./textField.module.scss";

const TextField = ({ name, label, value, error, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className={error ? style.form_field__error : style.form_field}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />

      {error && <span className={style.form__error}>{error}</span>}
    </div>
  );
};

export default TextField;
