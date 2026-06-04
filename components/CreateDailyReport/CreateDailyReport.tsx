import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ApiService from "../../services/ApiService";
import ExternalActivity from "../../models/externalActivity.model";
import DailyReportForm, { DailyReportFormValues } from "../DailyReportForm/DailyReportForm";

function toCreatePayload(values: DailyReportFormValues) {
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
        ...(values.externalActivityId !== undefined ? { externalActivityId: values.externalActivityId } : {}),
        ...(values.comment ? { comment: values.comment } : {}),
    };
}

export default function CreateDailyReport({ navigation, route }: { navigation: any; route: any }) {
    const childId = Number(route?.params?.childId);
    const childcareId = Number(route?.params?.childcareId);
    const childName = String(route?.params?.childName ?? "");
    const [externalActivities, setExternalActivities] = useState<ExternalActivity[]>([]);

    useEffect(() => {
        ApiService.GetExternalActivities()
            .then((res) => {
                if (res.success === true) {
                    setExternalActivities(res.data ?? []);
                }
            })
            .catch(() => setExternalActivities([]));
    }, []);

    const handleSubmit = async (values: DailyReportFormValues) => {
        if (!childId) {
            return;
        }

        await ApiService.CreateDailyReport(childId, toCreatePayload(values));
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
            <Text style={styles.h1}>Créer une note</Text>
            <Text>{childName || `Enfant #${childId}`}</Text>
            <Separator />
            <DailyReportForm
                externalActivities={externalActivities}
                submitLabel="Enregistrer la note"
                onSubmit={handleSubmit}
            />
        </View>
    );
}
