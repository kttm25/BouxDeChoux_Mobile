
export default interface CreateChildDTO {
    firstName: string;
    lastName: string;
    birthDate: string;
    allergies?: string;
    medication?: string;
    comment?: string;
    parentId: string;
    parentIds?: string[];
}
