import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetSectionList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Heading } from "@/components/ui/heading";
import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";
import { Image } from "expo-image";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import { cn } from "@/utils/libs/tailwind";

// WE ARE DEALING WITH A CONSEQUENT LIST, SO WE USE STYLE SHEET CSS INSTEAD
// OF TAILWIND FOR PERFORMANCE REASONS

const snapPoints = ["75%"];

type FoodItem = (typeof fruits)[keyof typeof fruits];

const initialSections = [
	{
		title: "Fruits",
		data: Object.values(fruits),
	},
	{
		title: "Légumes",
		data: Object.values(vegetables),
	},
];

export default function Page() {
	const sheetRef = useRef<BottomSheet>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedId, setSelectedId] = useState<Array<string> | null>(null);

	// Filter sections based on search query
	const filteredSections = useMemo(() => {
		if (!searchQuery) return initialSections;

		return initialSections
			.map((section) => ({
				title: section.title,
				data: section.data.filter((item) =>
					item.label.FR.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.includes(
							searchQuery
								.toLowerCase()
								.normalize("NFD")
								.replace(/[\u0300-\u036f]/g, "")
						)
				),
			}))
			.filter((section) => section.data.length > 0); // remove empty sections
	}, [searchQuery]);

	const renderSectionHeader = useCallback(
		({ section }: { section: (typeof initialSections)[number] }) => (
			<View style={styles.sectionHeaderContainer}>
				<View style={styles.sectionHeader} className="bg-primary">
					<Text style={styles.sectionHeaderText}>{section.title}</Text>
				</View>
			</View>
		),
		[]
	);

	const renderItem = useCallback(
		({ item }: { item: FoodItem }) => (
			<PressableButton
				style={[styles.itemContainer]}
				onPress={() => {
					if (selectedId?.includes(item.label.FR)) {
						setSelectedId(selectedId.filter((id) => id !== item.label.FR));
					} else {
						setSelectedId([...(selectedId || []), item.label.FR]);
					}
				}}
			>
				<Image style={styles.itemImage} contentFit="contain" source={item.image} alt={item.label.FR} />
				<Text style={[styles.itemText, selectedId?.includes(item.label.FR) && styles.selectedItemText]}>
					{item.label.FR}
				</Text>
			</PressableButton>
		),
		[selectedId]
	);

	return (
		<>
			<Heading level={1}>Composer avec mon Frigo</Heading>
			<Button title="Ouvrir le frigo" onPress={() => sheetRef.current?.snapToIndex(0)} />
			<BottomSheet
				ref={sheetRef}
				enablePanDownToClose={true}
				enableDynamicSizing={false}
				snapPoints={snapPoints}
				index={-1}
			>
				<BottomSheetTextInput
					placeholder="Chercher un aliment"
					style={styles.searchInput}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<BottomSheetSectionList
					sections={filteredSections}
					renderItem={renderItem}
					renderSectionHeader={renderSectionHeader}
					contentContainerStyle={styles.bottomSheetContent}
					keyExtractor={(item, _) => item.label.FR}
				/>

				<View className="flex-row justify-around">
					<Button
						title="Effacer"
						onPress={() => {
							setSelectedId(null);
							setSearchQuery("");
						}}
					/>
					<Button title="Ajouter" onPress={() => sheetRef.current?.close()} />
				</View>
			</BottomSheet>
		</>
	);
}

const styles = StyleSheet.create({
	sectionHeaderContainer: {
		flexDirection: "row",
	},
	sectionHeader: {
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 4,
		marginBottom: 6,
	},
	sectionHeaderText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	itemContainer: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
		padding: 8,
		marginVertical: 2,
		borderRadius: 8,
	},
	itemImage: {
		width: 30,
		height: 30,
	},
	selectedItemText: {
		color: "#ffffff",
	},
	itemText: {
		fontSize: 20,
	},
	searchInput: {
		marginBottom: 10,
		padding: 12,
		borderRadius: 10,
		fontSize: 16,
		backgroundColor: "rgba(151, 151, 151, 0.25)",
	},
	bottomSheetContent: {
		backgroundColor: "white",
		paddingRight: 10,
	},
});

const PressableButton = ({
	children,
	...props
}: {
	children: React.ReactNode;
	className?: string;
	props?: PressableProps;
}) => {
	return (
		<Pressable className={({ pressed }) => cn("p-4 rounded-lg", pressed ? "bg-primary/80" : "")} {...props}>
			{children}
		</Pressable>
	);
};
