import { BottomSheetFooter, BottomSheetSectionList, BottomSheetFooterProps, BottomSheetModal, BottomSheetScrollView, } from "@gorhom/bottom-sheet";
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

	// const renderSectionHeader = React.useCallback(
	// 	({ section }: { section: (typeof data)[number] }) => (
	// 		<View style={styles.sectionHeaderContainer}>
	// 			<View style={styles.sectionHeader}>
	// 				<Text style={styles.sectionHeaderText}>{section.title}</Text>
	// 			</View>
	// 		</View>
	// 	),
	// 	[]
	// );

	// const renderItem = React.useCallback(
	// 	({ item }: { item: FoodItem }) => (
	// 		<Pressable
	// 			style={[
	// 				styles.itemContainer,
	// 				selectedIds.find((id) => id.id === item.id) && styles.selectedItemBackground,
	// 			]}
	// 			onPress={() => {
	// 				if (selectedIds.find((id) => id.id === item.id)) {
	// 					setSelectedIds(selectedIds.filter((selected) => selected.id !== item.id));
	// 				} else {
	// 					setSelectedIds((prev) => [...prev, item]);
	// 				}
	// 			}}
	// 		>
	// 			<Image style={styles.itemImage} contentFit="contain" source={item.image} alt={item.label.FR} />
	// 			<Text
	// 				style={[styles.itemText, selectedIds.find((id) => id.id === item.id) && styles.selectedItemText]}
	// 			>
	// 				{item.label.FR}
	// 			</Text>
	// 		</Pressable>
	// 	),
	// 	[selectedIds]
	// );

	const renderFooter = React.useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View style={styles.footerContainer}>
					<Button
						title="Effacer"
						onPress={() => {
							setSelectedIds([]);
							setSearchQuery("");
						}}
					/>
					<Button
						title="Ajouter"
						onPress={() => {
							onSelect(selectedIds);
							sheetRef.current?.close();
							setSelectedIds([]);
							setSearchQuery("");
						}}
					/>
				</View>
			</BottomSheetFooter>
		),
		[onSelect, selectedIds]
	);

	return (
		<>
			<Button title={titleModal} onPress={handlePresentModalPress} />
			<BottomSheetModal
				ref={sheetRef}
				enablePanDownToClose={true}
				enableDynamicSizing={false}
				snapPoints={snapPoints}
				footerComponent={renderFooter}
			>
				<BottomSheetTextInput
					placeholder={placeholderSearch}
					style={styles.searchInput}
					onChangeText={setSearchQuery}
				/>

				<BottomSheetScrollView style={styles.bottomSheetContent}>
					<MemoizedSections 
						sections={filteredSections} 
						selectedIds={selectedIds}
						onItemPress={(item) => {
							if (selectedIds.find((id) => id.id === item.id)) {
								setSelectedIds(selectedIds.filter((selected) => selected.id !== item.id));
							} else {
								setSelectedIds((prev) => [...prev, item]);
							}
						}}
					/>
				</BottomSheetScrollView>

				{/* <BottomSheetSectionList
					maxToRenderPerBatch={1}			
					sections={filteredSections}
					renderItem={renderItem}
					renderSectionHeader={renderSectionHeader}
					contentContainerStyle={styles.bottomSheetContent}
					keyExtractor={(item) => item.id}
				/> */}
			</BottomSheetModal>
		</>
	);
}

const MemoizedSections = React.memo(({ sections, selectedIds, onItemPress }: {
	sections: Props['data'],
	selectedIds: FoodItem[],
	onItemPress: (item: FoodItem) => void
}) => (
	<>
		{sections.map((section) => (
			<View key={section.title} style={styles.bottomSheetContent}>
				<View style={styles.sectionHeaderContainer}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>{section.title}</Text>
					</View>
				</View>
				{section.data.map((item) => (
					<Pressable
						key={item.id}
						style={[styles.itemContainer, selectedIds.find((id) => id.id === item.id) && styles.selectedItemBackground]}
						onPress={() => onItemPress(item)}
					>
						<Image
							style={styles.itemImage}
							contentFit="contain"
							source={item.image}
							alt={item.label.FR}
						/>
						<Text
							style={[
								styles.itemText,
								selectedIds.find((id) => id.id === item.id) && styles.selectedItemText,
							]}
						>
							{item.label.FR}
						</Text>
					</Pressable>
				))}
			</View>
		))}
	</>
), (prevProps, nextProps) => {
	// optional: custom comparison function
	return (
		prevProps.sections === nextProps.sections &&
		prevProps.selectedIds === nextProps.selectedIds
	);
});

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
		color: "#ffffff",
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
	// bottomSheetContent: {
	// 	backgroundColor: "white",
	// 	paddingRight: 10,
	// 	paddingBottom: 100,
	// },
	bottomSheetContent: {
		marginBottom: 30,
	},
	footerContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 8,
		backgroundColor: "#ffffff",
	},
});