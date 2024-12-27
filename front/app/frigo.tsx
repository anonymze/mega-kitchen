import BottomSheetSelect, { FoodItem } from "@/components/bottom-sheet-select";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Heading } from "@/components/ui/heading";
import { Button, Text, View } from "react-native";
import vegetables from "@/utils/data/vegetables";
import { Link, router } from "expo-router";
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
	const latestBatchRef = React.useRef<FoodItem[]>([]);

	const getSelectecValues = (values: FoodItem[]) => {
		latestBatchRef.current = values;
		setSelectedValues((prev) => [...new Set([...prev, ...values])]);
	};

	return (
		<BottomSheetModalProvider>
			<View className="flex-1 p-4">
				<Link href="/">Retour</Link>
				<Heading level={1}>Composer avec mon Frigo</Heading>

				<BottomSheetSelect
					onSelect={getSelectecValues}
					titleModal="Ouvrir le frigo"
					data={initialSections}
					placeholderSearch="Chercher un aliment"
				/>

				{selectedValues.length > 0 && (
					<View>
						<Heading level={2} className="my-6">
							Vos aliments :
						</Heading>
						<View className="flex-row flex-wrap gap-4 mb-6">
							{selectedValues.map((value) => (
								<Animated.View
									key={value.id}
									entering={FadeInDown.duration(300)
										.delay(latestBatchRef.current.indexOf(value) * 100)
										.springify()}
								>
									<Image source={value.image} style={{ width: 50, height: 50 }} />
								</Animated.View>
							))}
						</View>

						{selectedValues.length >= 1 ? (
							<Button
								color="red"
								title="Chercher une recette"
								onPress={() => {
									router.push("/(recipe)/recipe");
								}}
							/>
						) : (
							<Text className="text-center text-gray-500">
								Ajouter au moins 3 aliments pour chercher une recette.
							</Text>
						)}
					</View>
				)}
			</View>
		</BottomSheetModalProvider>
	);
}
