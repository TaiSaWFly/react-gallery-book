import * as yup from "yup";

export const addNewBookSchema = yup.object().shape({
    author: yup.string().required("Обезательно для заполнения"),
    name: yup.string().required("Обезательно для заполнения")
});

export const editNameSchema = yup.object().shape({
    name: yup.string().required("Обезательно для заполнения")
});

export const editAuthorSchema = yup.object().shape({
    author: yup.string().required("Обезательно для заполнения")
});
