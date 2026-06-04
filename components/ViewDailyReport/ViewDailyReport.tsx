import { ScrollView, Text, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import DailyReport from "../../models/dailyReport.model";

function formatDisplayDate(dateValue: string): string {
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
        return dateValue;
    }

    return parsed.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function ratingLabel(value: number): string {
    if (value >= 3) return "Très bien";
    if (value === 2) return "Moyen";
    return "Faible";
}

function napLabel(value: number): string {
    if (value >= 3) return "Complète";
    if (value === 2) return "Courte";
    return "Pas de sieste";
}

function ratingBlock(title: string, value: number, customLabel?: string) {
    return (
        <View style={{ width: "100%", padding: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", marginBottom: 8 }}>
            <Text style={{ fontWeight: "700", marginBottom: 4 }}>{title}</Text>
            <Text>Niveau: {value}/3</Text>
            <Text>Appréciation: {customLabel ?? ratingLabel(value)}</Text>
        </View>
    );
}

export default function ViewDailyReport({ route }: { route: any }) {
    const report: DailyReport | undefined = route?.params?.report;
    const childName: string = route?.params?.childName ?? "";

    if (!report) {
        return (
            <View style={styles.container}>
                <Text>Rapport introuvable.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
                <Text style={styles.h1}>Consultation du rapport</Text>
                {!!childName && <Text>Enfant: {childName}</Text>}
                <Text>Date: {formatDisplayDate(report.date)}</Text>
                <Separator />

                <View style={[styles.form_container, { width: "95%" }]}>
                    {ratingBlock("Humeur", report.mood)}
                    {ratingBlock("Participation", report.participation)}
                    {ratingBlock("Respect des consignes", report.respectingInstructions)}
                    {ratingBlock("Appétit", report.appetite)}
                    {ratingBlock("Sieste", report.nap, napLabel(report.nap))}

                    <View style={{ width: "100%", padding: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", marginBottom: 8 }}>
                        <Text style={{ fontWeight: "700", marginBottom: 4 }}>Activité extérieure</Text>
                        <Text>{report.externalActivityName ?? (report.externalActivityId ? `Activité #${report.externalActivityId}` : "Aucune")}</Text>
                    </View>

                    <View style={{ width: "100%", padding: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", marginBottom: 8 }}>
                        <Text style={{ fontWeight: "700", marginBottom: 4 }}>Commentaire</Text>
                        <Text>{report.comment?.trim() ? report.comment : "Aucun commentaire"}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
