import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetSectionList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Heading } from "@/components/ui/heading";
import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";
import { Image } from "expo-image";

const snapPoints = ["75%"];

type FoodItem = (typeof fruits)[keyof typeof fruits];

const initialSections = [
	{
		title: "Féculents",
		data: Object.values(fruits),
	},
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
			.filter((section) => section.data.length > 0); // Remove empty sections
	}, [searchQuery]);

	const renderSectionHeader = useCallback(
		({ section }: { section: (typeof initialSections)[number] }) => (
			<View className="p-2 mb-1 bg-primary rounded-lg">
				<Text className="text-light text-lg font-bold">{section.title}</Text>
			</View>
		),
		[]
	);

	const renderItem = useCallback(
		({ item }: { item: FoodItem }) => (
			<View className="flex-row gap-3 items-center p-2 my-1">
				<Image
					style={{
						width: 30,
						height: 30,
					}}
					contentFit="contain"
					source={item.image}
					alt={item.label.FR}
				/>
				<Text className="text-xl">{item.label.FR}</Text>
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
				<BottomSheetTextInput
					placeholder="Chercher un aliment"
					style={{
						marginTop: 8,
						marginBottom: 10,
						borderRadius: 10,
						fontSize: 16,
						padding: 12,
						backgroundColor: "rgba(151, 151, 151, 0.25)",
					}}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<BottomSheetSectionList
					sections={filteredSections}
					renderItem={renderItem}
					renderSectionHeader={renderSectionHeader}
					contentContainerStyle={{
						backgroundColor: "white",
						// spaceing scrollbar
						paddingRight: 8,
					}}
					keyExtractor={(item, _) => item.label.FR}
				/>
			</BottomSheet>
		</>
	);
}
