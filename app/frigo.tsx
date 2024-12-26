import BottomSheetSelect, { FoodItem } from "@/components/ui/bottom-sheet-select";
import { Heading } from "@/components/ui/heading";
import vegetables from "@/utils/data/vegetables";
import { Text, View } from "react-native";
import fruits from "@/utils/data/fruits";
import { Image } from "expo-image";
import React from "react";


const initialSections = [
	{
		title: "Fruits",
		data: fruits,
	},
	{
		title: "Légumes",
		data: vegetables,
	},
];

export default function Page() {
	const [selectedValues, setSelectedValues] = React.useState<FoodItem[]>([]);

	const getSelectecValues = (values: FoodItem[]) => {
		// bottom sheet share same reference for the same item, so it works
		setSelectedValues((prev) => [...new Set([...prev, ...values])]);
	};

	return (
		<>
			<Heading level={1}>Composer avec mon Frigo</Heading>
			
			<BottomSheetSelect
				onSelect={getSelectecValues}
				titleModal="Ouvrir le frigo"
				data={initialSections}
				placeholderSearch="Chercher un aliment"
			/>

			{selectedValues.length > 0 && (
				<View>
					<Heading level={2} className="my-4">Vos aliments :</Heading>
					<View className="flex-row flex-wrap gap-2">
						{selectedValues.map((value) => (
							<View key={value.id}>
								<Image source={value.image} style={{ width: 50, height: 50 }} />
							</View>
						))}
					</View>
				</View>
			)}
		</>
	);
}
