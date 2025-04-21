export default interface CreateChildCareDto {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    maxCapacity: number;
    actualCapacity: number;
    mondayOpeningHours: Array<string>;
    tuesdayOpeningHours: Array<string>;
    wednesdayOpeningHours: Array<string>;
    thursdayOpeningHours: Array<string>;
    fridayOpeningHours: Array<string>;
}