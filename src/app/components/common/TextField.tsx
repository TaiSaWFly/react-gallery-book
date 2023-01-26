import React from "react";
import { IFieldData } from "../../models/FieldData";
import style from "./textField.module.scss";

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  error: string | undefined;
  onChange: (target: IFieldData) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  error,
  onChange,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
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
