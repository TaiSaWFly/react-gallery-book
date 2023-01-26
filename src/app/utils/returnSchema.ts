import { editAuthorSchema, editNameSchema } from "./yupSchema";

export const returnSchema = (fieldName: string): any => {
  switch (fieldName) {
    case "name":
      return editNameSchema;

    case "author":
      return editAuthorSchema;

    default:
      break;
  }
};
