import BottomSheetSelect, { FoodItem } from "@/components/ui/bottom-sheet-select";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Heading } from "@/components/ui/heading";
import vegetables from "@/utils/data/vegetables";
import { Button, View } from "react-native";
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
			<BottomSheetModalProvider>
				<Heading level={1}>Composer avec mon Frigo</Heading>

				<BottomSheetSelect
					onSelect={getSelectecValues}
					titleModal="Ouvrir le frigo"
					data={initialSections}
					placeholderSearch="Chercher un aliment"
				/>

				{selectedValues.length > 0 && (
					<View className="mb-6">
						<Heading level={2} className="my-6">
							Vos aliments :
						</Heading>
						<View className="flex-row flex-wrap gap-2">
							{selectedValues.map((value, index) => (
								<Animated.View 
									key={value.id}
									entering={FadeInDown.duration(300)
										.delay(index * 80)
										.springify()}
								>
									<Image source={value.image} style={{ width: 50, height: 50 }} />
								</Animated.View>
							))}
						</View>
					</View>
				)}

				<Button color="red" title="Chercher une recette" onPress={() => {}} />
			</BottomSheetModalProvider>
	);
}
