import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../../constants/Styles';
import ExternalActivity from '../../models/externalActivity.model';

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

type Props = {
	initialValues?: Partial<DailyReportFormValues>;
	externalActivities?: ExternalActivity[];
	submitLabel: string;
	onSubmit: (values: DailyReportFormValues) => void | Promise<void>;
};

function toDateInputValue(date: Date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseDateInputValue(value: string) {
	const parsedDate = new Date(`${value}T00:00:00`);
	return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
}

function clampRating(value: string, fallback: number) {
	const parsed = Number.parseInt(value, 10);
	if (Number.isNaN(parsed)) {
		return fallback;
	}
	return Math.min(5, Math.max(1, parsed));
}

export default function DailyReportForm({ initialValues, externalActivities = [], submitLabel, onSubmit }: Props) {
	const defaults = useMemo<DailyReportFormValues>(
		() => ({
			date: initialValues?.date ?? new Date(),
			mood: initialValues?.mood ?? 2,
			participation: initialValues?.participation ?? 2,
			respectingInstructions: initialValues?.respectingInstructions ?? 2,
			appetite: initialValues?.appetite ?? 2,
			nap: initialValues?.nap ?? 2,
			externalActivityId: initialValues?.externalActivityId,
			comment: initialValues?.comment ?? '',
		}),
		[initialValues],
	);

	const [dateValue, setDateValue] = useState(toDateInputValue(defaults.date));
	const [mood, setMood] = useState(String(defaults.mood));
	const [participation, setParticipation] = useState(String(defaults.participation));
	const [respectingInstructions, setRespectingInstructions] = useState(String(defaults.respectingInstructions));
	const [appetite, setAppetite] = useState(String(defaults.appetite));
	const [nap, setNap] = useState(String(defaults.nap));
	const [externalActivityId, setExternalActivityId] = useState(
		defaults.externalActivityId === undefined ? '' : String(defaults.externalActivityId),
	);
	const [comment, setComment] = useState(defaults.comment);

	async function handleSubmit() {
		await onSubmit({
			date: parseDateInputValue(dateValue),
			mood: clampRating(mood, defaults.mood),
			participation: clampRating(participation, defaults.participation),
			respectingInstructions: clampRating(respectingInstructions, defaults.respectingInstructions),
			appetite: clampRating(appetite, defaults.appetite),
			nap: clampRating(nap, defaults.nap),
			externalActivityId: externalActivityId.trim() ? Number.parseInt(externalActivityId, 10) : undefined,
			comment: comment.trim(),
		});
	}

	return (
		<View style={{ width: '100%', maxWidth: 720, alignSelf: 'center', gap: 14 }}>
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Date</Text>
				<TextInput style={styles.input} value={dateValue} onChangeText={setDateValue} placeholder="YYYY-MM-DD" />
			</View>
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Humeur</Text>
				<TextInput style={styles.input} keyboardType="numeric" value={mood} onChangeText={setMood} />
			</View>
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Participation</Text>
				<TextInput style={styles.input} keyboardType="numeric" value={participation} onChangeText={setParticipation} />
			</View>
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Respect des consignes</Text>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					value={respectingInstructions}
					onChangeText={setRespectingInstructions}
				/>
			</View>
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Appétit</Text>
				<TextInput style={styles.input} keyboardType="numeric" value={appetite} onChangeText={setAppetite} />
			</View>
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Sieste</Text>
				<TextInput style={styles.input} keyboardType="numeric" value={nap} onChangeText={setNap} />
			</View>
			{externalActivities.length > 0 ? (
				<View style={styles.formField}>
					<Text style={styles.fieldLabel}>Activité externe</Text>
					<TextInput
						style={styles.input}
						keyboardType="numeric"
						value={externalActivityId}
						onChangeText={setExternalActivityId}
						placeholder="ID de l'activité"
					/>
					<Text style={styles.helperText}>
						Options disponibles: {externalActivities.map((activity) => `${activity.id} - ${activity.name}`).join(' | ')}
					</Text>
				</View>
			) : null}
			<View style={styles.formField}>
				<Text style={styles.fieldLabel}>Commentaire</Text>
				<TextInput
					style={[styles.input, { minHeight: 110, textAlignVertical: 'top' }]}
					multiline
					value={comment}
					onChangeText={setComment}
					placeholder="Ajouter un commentaire"
				/>
			</View>
			<Pressable style={[styles.primaryButton, { backgroundColor: '#2A9D8F' }]} onPress={handleSubmit}>
				<Text style={styles.primaryButtonText}>{submitLabel}</Text>
			</Pressable>
		</View>
	);
}
