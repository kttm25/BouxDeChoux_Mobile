import * as yup from "yup";
const { object, string, ref } = yup;
import { AppRegex, AppText } from "../constants/Constants";

export const updateUserSchema = object({
    firstName: string().required(AppText.firstname_required).max(100),
    lastName: string().required(AppText.lastname_required).max(100),
    address: string().required(AppText.address_required).max(250),
});

export type UpdateUserSchemaType = yup.InferType<typeof updateUserSchema>;