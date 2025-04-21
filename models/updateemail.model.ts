import * as yup from "yup";
const { object, string, ref } = yup;
import { AppRegex, AppText } from "../constants/Constants";

export const updateemailSchema = object({
    email: string().email(AppText.email_error).required(AppText.email_required)
});

export type UpdateEmailSchemaType = yup.InferType<typeof updateemailSchema>;