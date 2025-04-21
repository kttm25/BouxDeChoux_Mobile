import * as yup from "yup";
const { object, string, ref } = yup;
import { AppRegex, AppText } from "../constants/Constants";

export const chilcareSchema = object({
    name: string().required(AppText.name_required).max(100),
    address: string().required(AppText.address_required).max(250),
    phoneNumber: string().required(AppText.phone_required).matches(AppRegex.phoneNumber, AppText.phone_number_error),
    email: string().email(AppText.email_error).required(AppText.email_required),
    maxChildrenCapacity: yup.number().positive().required(AppText.param_required),
    openinghours: string().required(AppText.param_required),
});

export type ChilcareSchemaSchemaType = yup.InferType<typeof chilcareSchema>;