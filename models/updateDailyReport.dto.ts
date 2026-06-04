export default interface UpdateDailyReportDTO {
    date?: string;
    mood?: number;
    participation?: number;
    respectingInstructions?: number;
    appetite?: number;
    nap?: number;
    externalActivityId?: number;
    comment?: string;
}
