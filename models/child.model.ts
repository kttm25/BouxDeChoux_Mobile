
export default interface Child {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    allergies?: string;
    medication?: string;
    comment?: string;
    parentId: string;
}
