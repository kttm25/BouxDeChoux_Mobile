import * as yup from "yup";
const { object, string } = yup;
import { AppText } from "../constants/Constants";

export const createChildSchema = object({
    firstName: string().required(AppText.firstname_required).max(100),
    lastName: string().required(AppText.lastname_required).max(100),
    birthDate: string().required("La date de naissance est requise"),
    medication: string(),
    comment: string(),
});

export type CreateChildSchemaType = {
    firstName: string;
    lastName: string;
    birthDate: string;
    medication?: string | undefined;
    comment?: string | undefined;
};
