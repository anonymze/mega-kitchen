import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import TailwindConfig from "@/tailwind.config";

interface Props {
	titleModal: string;
	placeholderSearch: string;
	data: any;
	onSelect: (values: string[]) => void;
}

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

const snapPoints = ["75%"];

export default function BottomSheetSelect({ onSelect, titleModal, placeholderSearch, data }: Props) {
	const sheetRef = React.useRef<BottomSheet>(null);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

	// filter sections based on search query
	const filteredSections = React.useMemo(() => {
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
			.filter((section) => section.data.length > 0); // Remove empty sections
	}, [searchQuery]);

	const renderSectionHeader = React.useCallback(
		({ section }: { section: (typeof initialSections)[number] }) => (
			<View style={styles.sectionHeaderContainer}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionHeaderText}>{section.title}</Text>
				</View>
			</View>
		),
		[]
	);

	const renderItem = React.useCallback(
		({ item }: { item: FoodItem }) => (
			<Pressable
				style={[styles.itemContainer, selectedIds?.includes(item.label.FR) && styles.selectedItemBackground]}
				onPress={() => {
					if (selectedIds?.includes(item.label.FR)) {
						setSelectedIds(selectedIds.filter((id) => id !== item.label.FR));
					} else {
						setSelectedIds((prev) => [...prev, item.label.FR]);
					}
				}}
			>
				<Image style={styles.itemImage} contentFit="contain" source={item.image} alt={item.label.FR} />
				<Text style={[styles.itemText, selectedIds?.includes(item.label.FR) && styles.selectedItemText]}>
					{item.label.FR}
				</Text>
			</Pressable>
		),
		[selectedIds]
	);

	return (
		<>
			<Button title={titleModal} onPress={() => sheetRef.current?.snapToIndex(0)} />
			<BottomSheet
				ref={sheetRef}
				enablePanDownToClose={true}
				enableDynamicSizing={false}
				snapPoints={snapPoints}
				index={-1}
			>
				<BottomSheetTextInput
					placeholder={placeholderSearch}
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
							// reset inputs
							setSelectedIds([]);
							setSearchQuery("");
						}}
					/>
					<Button
						title="Ajouter"
						onPress={() => {
							onSelect(selectedIds);
							sheetRef.current?.close();

							// reset inputs
							setSelectedIds([]);
							setSearchQuery("");
						}}
					/>
				</View>
			</BottomSheet>
		</>
	);
}

// WE ARE DEALING WITH A CONSEQUENT LIST, SO WE USE STYLE SHEET CSS
// INSTEAD OF TAILWIND FOR PERFORMANCE REASONS

const styles = StyleSheet.create({
	sectionHeaderContainer: {
		flexDirection: "row",
	},
	sectionHeader: {
		// @ts-ignore
		backgroundColor: TailwindConfig.theme.colors.primary,
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
	selectedItemBackground: {
		// @ts-ignore
		backgroundColor: TailwindConfig.theme.colors.primary + "AA",
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
