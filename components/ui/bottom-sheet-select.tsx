import { BottomSheetFooter, BottomSheetSectionList, BottomSheetFooterProps, BottomSheetModal, } from "@gorhom/bottom-sheet";
import { View, Button, Text, StyleSheet } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native-gesture-handler";
import vegetables from "@/utils/data/vegetables";
import TailwindConfig from "@/tailwind.config";
import fruits from "@/utils/data/fruits";
import { Image } from "expo-image";
import React from "react";


export type FoodItem = (typeof fruits)[number] | (typeof vegetables)[number];

interface Props {
	titleModal: string;
	placeholderSearch: string;
	data: {
		title: string;
		data: FoodItem[];
	}[];
	onSelect: (values: FoodItem[]) => void;
}

const snapPoints = ["75%"];

export default function BottomSheetSelect({ onSelect, titleModal, placeholderSearch, data }: Props) {
	const sheetRef = React.useRef<BottomSheetModal>(null);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [selectedIds, setSelectedIds] = React.useState<FoodItem[]>([]);

	const handlePresentModalPress = React.useCallback(() => {
		sheetRef.current?.present();
	}, []);

	// filter sections based on search query
	const filteredSections = React.useMemo(() => {
		if (!searchQuery) return data;

		return data
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
		({ section }: { section: (typeof data)[number] }) => (
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
				style={[
					styles.itemContainer,
					selectedIds.find((id) => id.id === item.id) && styles.selectedItemBackground,
				]}
				onPress={() => {
					console.log("heyyyy");
					console.log(item);
					if (selectedIds.find((id) => id.id === item.id)) {
						setSelectedIds(selectedIds.filter((selected) => selected.id !== item.id));
					} else {
						setSelectedIds((prev) => [...prev, item]);
						console.log("ici");
						console.log(selectedIds);
					}
				}}
			>
				<Image style={styles.itemImage} contentFit="contain" source={item.image} alt={item.label.FR} />
				<Text
					style={[styles.itemText, selectedIds.find((id) => id.id === item.id) && styles.selectedItemText]}
				>
					{item.label.FR}
				</Text>
			</Pressable>
		),
		[selectedIds]
	);

	return (
		<>
			<Button title={titleModal} onPress={handlePresentModalPress} />
			<BottomSheetModal
				ref={sheetRef}
				enablePanDownToClose={true}
				enableDynamicSizing={false}
				snapPoints={snapPoints}
				footerComponent={(props) => (
					<BottomSheetFooter {...props}>
						<View style={styles.footerContainer}>
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

									// // reset inputs
									setSelectedIds([]);
									setSearchQuery("");
								}}
							/>
						</View>
					</BottomSheetFooter>
				)}
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
					keyExtractor={(item) => item.id}
				/>
			</BottomSheetModal>
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
		paddingBottom: 100,
	},
	footerContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 8,
		backgroundColor: "#ffffff",
	},
});
