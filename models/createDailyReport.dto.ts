export default interface CreateDailyReportDTO {
    date: string;
    mood: number;
    participation: number;
    respectingInstructions: number;
    appetite: number;
    nap: number;
    externalActivityId?: number;
    comment?: string;
}
