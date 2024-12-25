import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetSectionList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Heading } from "@/components/ui/heading";

const snapPoints = ["70%", "90%"];

const sections = Array(10)
	.fill(0)
	.map((_, index) => ({
		title: `Section ${index}`,
		data: Array(10)
			.fill(0)
			.map((_, index) => `Item ${index}`),
	}));

export default function Page() {
	const sheetRef = useRef<BottomSheet>(null);

	const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

	const renderSectionHeader = useCallback(
    ({ section }) => (
      <View style={styles.sectionHeaderContainer}>
        <Text>{section.title}</Text>
      </View>
    ),
    []
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
				<BottomSheetTextInput placeholder="Chercher un aliment" style={styles.input} />
				<BottomSheetSectionList
					sections={sections}
					keyExtractor={(i) => i}
					renderSectionHeader={renderSectionHeader}
					renderItem={renderItem}
					contentContainerStyle={styles.contentContainer}
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
});
