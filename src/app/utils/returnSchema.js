import { editAuthorSchema, editNameSchema } from "./yupSchema";

export function returnSchema(fieldName) {
    switch (fieldName) {
        case "name":
            return editNameSchema;

        case "author":
            return editAuthorSchema;

        default:
            break;
    }
}
