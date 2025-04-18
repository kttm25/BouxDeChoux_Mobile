import { object, string, ref } from "yup";
import { AppRegex, AppText } from "../constants/Constants";

export const loginSchema = object({
    email: string().email(AppText.email_error).required(AppText.email_required),
    password: string().required().matches(AppRegex.password, AppText.password_error),
    //password: string().required().min(8).matches(/^(?=.*[0-9]).{8,}$/, "Password must be at least 8 characters long and contain at least one number"),
});