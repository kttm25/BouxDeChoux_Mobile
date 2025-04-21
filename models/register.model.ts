import * as yup from "yup";
const { object, string, ref } = yup;
import { AppRegex, AppText } from "../constants/Constants";

export const registerSchema = object({
    email: string().email(AppText.email_error).required(AppText.email_required),
    firstName: string().required(AppText.firstname_required).max(100),
    lastName: string().required(AppText.lastname_required).max(100),
    address: string().required(AppText.address_required).max(250),
    phoneNumber: string().required(AppText.phone_required).matches(AppRegex.phoneNumber, AppText.phone_number_error),
    password: string().required().matches(AppRegex.password, AppText.password_error),
    confirmPassword: string().required(AppText.confirm_password_required).equals([ref("password")], AppText.password_not_match),
});

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;