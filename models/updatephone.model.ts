import * as yup from "yup";
const { object, string, ref } = yup;
import { AppRegex, AppText } from "../constants/Constants";

export const updatephoneSchema = object({
    phoneNumber: string().required(AppText.phone_required).matches(AppRegex.phoneNumber, AppText.phone_number_error),
});

export type UpdatePhoneSchemaType = yup.InferType<typeof updatephoneSchema>;