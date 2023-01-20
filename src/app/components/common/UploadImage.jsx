import React, { useState } from "react";

const UploadImage = ({ name, label, onChange }) => {
  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    onChange({ name: e.target.name, value: base64 });
  };

  const convertBase64 = (file) => {
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
