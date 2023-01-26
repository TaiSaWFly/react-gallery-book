import React, { useState } from "react";
import { IFieldData } from "../../models/FieldData";

interface UploadImageProps {
  name: string;
  label: string;
  onChange: (target: IFieldData) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ name, label, onChange }) => {
  const [baseImage, setBaseImage] = useState<string>("");

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0] ? e.target.files[0] : "";

      if (file === "") {
        onChange({ name: e.target.name, value: baseImage });
      } else {
        const base64: any = await convertBase64(file);
        setBaseImage(base64);
        onChange({ name: e.target.name, value: base64 });
      }
    }
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="file"
        id={name}
        name={name}
        onChange={(e) => uploadImage(e)}
      />

      {baseImage && (
        <img width="145px" height="205px" src={baseImage} alt="img" />
      )}
    </div>
  );
};

export default UploadImage;
