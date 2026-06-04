export default interface DailyReport {
    id: number;
    childId: number;
    date: string;
    mood: number;
    participation: number;
    respectingInstructions: number;
    appetite: number;
    nap: number;
    externalActivityId?: number;
    externalActivityName?: string;
    comment?: string;
}
