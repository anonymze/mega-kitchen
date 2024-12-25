import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetSectionList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Heading } from "@/components/ui/heading";

const snapPoints = ["70%", "90%"];

const initialSections = [
	{
		title: "Fruits",
		data: ["Pomme", "Banane", "Orange", "Poire", "Fraise"]
	},
	{
		title: "Légumes",
		data: ["Carotte", "Tomate", "Poireau", "Courgette", "Salade"]
	},
	{
		title: "Féculents",
		data: ["Riz", "Pâtes", "Pomme de terre", "Quinoa", "Semoule"]
	}
];

export default function Page() {
	const sheetRef = useRef<BottomSheet>(null);
	const [searchQuery, setSearchQuery] = useState('');

	// Filter sections based on search query
	const filteredSections = useMemo(() => {
		if (!searchQuery) return initialSections;
		
		return initialSections
			.map(section => ({
				title: section.title,
				data: section.data.filter(item => 
					item.toLowerCase().includes(searchQuery.toLowerCase())
				)
			}))
			.filter(section => section.data.length > 0); // Remove empty sections
	}, [searchQuery]);

	const renderSectionHeader = useCallback(({ section }) => (
		<View style={styles.sectionHeaderContainer}>
			<Text style={styles.sectionHeaderText}>{section.title}</Text>
		</View>
	), []);

	const renderItem = useCallback(({ item }) => (
		<View style={styles.itemContainer}>
			<Text>{item}</Text>
		</View>
	), []);

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
					style={styles.input}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<BottomSheetSectionList
					sections={filteredSections}
					renderItem={renderItem}
					renderSectionHeader={renderSectionHeader}
					contentContainerStyle={styles.contentContainer}
					keyExtractor={(item, index) => item + index}
				/>
			</BottomSheet>
		</>
	);
}

// we use stylesheet because tailwind is not handled by some of these components
// and instead of using a mix, we harmonize the styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
	},
	contentContainer: {
		backgroundColor: "white",
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: "#eee",
	},
	input: {
		marginTop: 8,
		marginBottom: 10,
		borderRadius: 10,
		fontSize: 16,
		lineHeight: 20,
		padding: 8,
		backgroundColor: "rgba(151, 151, 151, 0.25)",
	},
	sectionHeaderContainer: {
		backgroundColor: "white",
		padding: 6,
	},
	sectionHeaderText: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
