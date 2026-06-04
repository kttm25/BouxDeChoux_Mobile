import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { styles } from "../../constants/Styles";
import ExternalActivity from "../../models/externalActivity.model";

export type DailyReportFormValues = {
    date: Date;
    mood: number;
    participation: number;
    respectingInstructions: number;
    appetite: number;
    nap: number;
    externalActivityId?: number;
    comment: string;
};

type RatingOption = {
    value: number;
    icon: string;
    label: string;
};

type RatingRowConfig = {
    key: keyof Pick<DailyReportFormValues, "mood" | "participation" | "respectingInstructions" | "appetite" | "nap">;
    title: string;
    options: RatingOption[];
};

type Props = {
    initialValues?: Partial<DailyReportFormValues>;
    externalActivities: ExternalActivity[];
    submitLabel: string;
    onSubmit: (values: DailyReportFormValues) => Promise<void> | void;
};

const ratingRows: RatingRowConfig[] = [
    {
        key: "mood",
        title: "Humeur",
        options: [
            { value: 1, icon: "😞", label: "Faible" },
            { value: 2, icon: "😐", label: "Moyen" },
            { value: 3, icon: "😄", label: "Très bien" },
        ],
    },
    {
        key: "participation",
        title: "Participation",
        options: [
            { value: 1, icon: "⬇️", label: "Faible" },
            { value: 2, icon: "↕️", label: "Moyenne" },
            { value: 3, icon: "⬆️", label: "Forte" },
        ],
    },
    {
        key: "respectingInstructions",
        title: "Respect des consignes",
        options: [
            { value: 1, icon: "❌", label: "Non" },
            { value: 2, icon: "⚪", label: "Parfois" },
            { value: 3, icon: "✅", label: "Oui" },
        ],
    },
    {
        key: "appetite",
        title: "Appétit",
        options: [
            { value: 1, icon: "🥄", label: "Faible" },
            { value: 2, icon: "🍽️", label: "Moyen" },
            { value: 3, icon: "😋", label: "Bon" },
        ],
    },
    {
        key: "nap",
        title: "Sieste",
        options: [
            { value: 1, icon: "🌙", label: "Pas de sieste" },
            { value: 2, icon: "💤", label: "Courte" },
            { value: 3, icon: "😴", label: "Complète" },
        ],
    },
];

function formatDateLabel(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function normalizeDateForApi(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}T00:00:00`;
}

function resolveInitialDate(value?: string | Date): Date {
    if (!value) {
        return new Date();
    }

    if (value instanceof Date) {
        return value;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function DailyReportForm({ initialValues, externalActivities, submitLabel, onSubmit }: Props) {
    const [date, setDate] = useState<Date>(resolveInitialDate(initialValues?.date));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mood, setMood] = useState<number>(initialValues?.mood ?? 2);
    const [participation, setParticipation] = useState<number>(initialValues?.participation ?? 2);
    const [respectingInstructions, setRespectingInstructions] = useState<number>(initialValues?.respectingInstructions ?? 2);
    const [appetite, setAppetite] = useState<number>(initialValues?.appetite ?? 2);
    const [nap, setNap] = useState<number>(initialValues?.nap ?? 2);
    const [externalActivityId, setExternalActivityId] = useState<number | undefined>(initialValues?.externalActivityId);
    const [comment, setComment] = useState<string>(initialValues?.comment ?? "");
    const [activityDropdownOpen, setActivityDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const selectedActivity = useMemo(() => externalActivities.find((item) => item.id === externalActivityId), [externalActivities, externalActivityId]);

    const updateRating = (field: keyof DailyReportFormValues, value: number) => {
        if (field === "mood") setMood(value);
        if (field === "participation") setParticipation(value);
        if (field === "respectingInstructions") setRespectingInstructions(value);
        if (field === "appetite") setAppetite(value);
        if (field === "nap") setNap(value);
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShowDatePicker(false);
        }

        if (event.type === "dismissed" || !selectedDate) {
            return;
        }

        setDate(selectedDate);
    };

    const submit = async () => {
        setLoading(true);
        try {
            await onSubmit({
                date,
                mood,
                participation,
                respectingInstructions,
                appetite,
                nap,
                externalActivityId,
                comment: comment.trim(),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.form_container, { width: "100%", gap: 12 }]}>
                <View style={{ width: "100%", padding: 12, borderRadius: 16, backgroundColor: "#F7F1E5", borderWidth: 1, borderColor: "#E2CFA4" }}>
                    <Text style={styles.h2}>Note journalière</Text>
                    <Text style={{ marginTop: 4, color: "#5C4B3A" }}>{formatDateLabel(date)}</Text>
                    <Pressable
                        onPress={() => setShowDatePicker(true)}
                        style={{
                            marginTop: 10,
                            alignSelf: "flex-start",
                            backgroundColor: "#fff",
                            borderColor: "#E2CFA4",
                            borderWidth: 1,
                            borderRadius: 999,
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                        }}
                    >
                        <Text>Changer la date</Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>

                {ratingRows.map((row) => (
                    <View key={row.key} style={{ width: "100%", gap: 8 }}>
                        <Text style={styles.h3}>{row.title}</Text>
                        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
                            {row.options.map((option) => {
                                const isActive = (row.key === "mood" && mood === option.value)
                                    || (row.key === "participation" && participation === option.value)
                                    || (row.key === "respectingInstructions" && respectingInstructions === option.value)
                                    || (row.key === "appetite" && appetite === option.value)
                                    || (row.key === "nap" && nap === option.value);

                                return (
                                    <Pressable
                                        key={`${row.key}-${option.value}`}
                                        onPress={() => updateRating(row.key, option.value)}
                                        style={{
                                            flex: 1,
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: isActive ? "#3A7AFE" : "#D9D9D9",
                                            backgroundColor: isActive ? "#DDEAFF" : "#FFFFFF",
                                            paddingVertical: 14,
                                            paddingHorizontal: 8,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: 84,
                                        }}
                                    >
                                        <Text style={{ fontSize: 22 }}>{option.icon}</Text>
                                        <Text style={{ marginTop: 6, fontWeight: "700" }}>{option.label}</Text>
                                        <Text style={{ marginTop: 2, color: "#667085" }}>Niveau {option.value}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                ))}

                <View style={{ width: "100%", gap: 8 }}>
                    <Text style={styles.h3}>Activité extérieure</Text>
                    <Pressable
                        onPress={() => setActivityDropdownOpen((prev) => !prev)}
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "#c7c7c7",
                            borderRadius: 16,
                            paddingVertical: 14,
                            paddingHorizontal: 14,
                            backgroundColor: "white",
                        }}
                    >
                        <Text>{selectedActivity?.name ?? "-- Aucune activité sélectionnée --"}</Text>
                    </Pressable>

                    {activityDropdownOpen && (
                        <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 16, maxHeight: 180, backgroundColor: "white" }}>
                            <ScrollView nestedScrollEnabled>
                                <Pressable
                                    onPress={() => {
                                        setExternalActivityId(undefined);
                                        setActivityDropdownOpen(false);
                                    }}
                                    style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                >
                                    <Text>Aucune activité</Text>
                                </Pressable>
                                {externalActivities.length === 0 && <Text style={{ padding: 10 }}>Aucune activité disponible</Text>}
                                {externalActivities.map((activity) => (
                                    <Pressable
                                        key={activity.id}
                                        onPress={() => {
                                            setExternalActivityId(activity.id);
                                            setActivityDropdownOpen(false);
                                        }}
                                        style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                    >
                                        <Text>{activity.name}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                <View style={{ width: "100%", gap: 8 }}>
                    <Text style={styles.h3}>Commentaire</Text>
                    <TextInput
                        style={[styles.form_text_input, { minHeight: 120, textAlignVertical: "top" }]}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Très bonne journée..."
                        multiline
                    />
                </View>

                <ButtonCustom
                    title={loading ? "Enregistrement..." : submitLabel}
                    style={[styles.button_principal, styles.aic]}
                    onPress={submit}
                />
            </View>
        </ScrollView>
    );
}
