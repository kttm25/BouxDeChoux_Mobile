import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ApiService from "../../services/ApiService";
import ExternalActivity from "../../models/externalActivity.model";
import DailyReport from "../../models/dailyReport.model";
import DailyReportForm, { DailyReportFormValues } from "../DailyReportForm/DailyReportForm";

function toUpdatePayload(values: DailyReportFormValues) {
    const year = values.date.getFullYear();
    const month = `${values.date.getMonth() + 1}`.padStart(2, "0");
    const day = `${values.date.getDate()}`.padStart(2, "0");

    return {
        date: `${year}-${month}-${day}T00:00:00`,
        mood: values.mood,
        participation: values.participation,
        respectingInstructions: values.respectingInstructions,
        appetite: values.appetite,
        nap: values.nap,
        externalActivityId: values.externalActivityId,
        comment: values.comment,
    };
}

export default function UpdateDailyReport({ navigation, route }: { navigation: any; route: any }) {
    const report: DailyReport = route?.params?.report;
    const childId = Number(route?.params?.childId);
    const childcareId = Number(route?.params?.childcareId);
    const childName = String(route?.params?.childName ?? "");
    const [externalActivities, setExternalActivities] = useState<ExternalActivity[]>([]);

    useEffect(() => {
        if (!report?.id) {
            navigation.navigate("ManageDailyReports");
            return;
        }

        ApiService.GetExternalActivities()
            .then((res) => {
                if (res.success === true) {
                    setExternalActivities(res.data ?? []);
                }
            })
            .catch(() => setExternalActivities([]));
    }, [report?.id]);

    const handleSubmit = async (values: DailyReportFormValues) => {
        if (!report?.id) {
            return;
        }

        await ApiService.UpdateDailyReport(report.id, toUpdatePayload(values));
        navigation.reset({
            index: 1,
            routes: [
                { name: "Home" },
                { name: "ManageDailyReports", params: { refreshKey: Date.now(), childcareId, childId } },
            ],
        });
    };

    return (
        <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
            <Text style={styles.h1}>Modifier une note</Text>
            <Text>{childName || `Enfant #${childId}`}</Text>
            <Separator />
            <DailyReportForm
                initialValues={{
                    date: report?.date ? new Date(report.date) : new Date(),
                    mood: report?.mood ?? 2,
                    participation: report?.participation ?? 2,
                    respectingInstructions: report?.respectingInstructions ?? 2,
                    appetite: report?.appetite ?? 2,
                    nap: report?.nap ?? 2,
                    externalActivityId: report?.externalActivityId,
                    comment: report?.comment ?? "",
                }}
                externalActivities={externalActivities}
                submitLabel="Mettre à jour"
                onSubmit={handleSubmit}
            />
        </View>
    );
}
