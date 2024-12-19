import { Heading } from "@/components/ui/heading";
import { View } from "react-native";
import fruitsAndVegetables from "@/utils/data/fruits_vegetables"
import { MONTHS } from "@/utils/data/months";

// 221 vegetables
// 162 fruits

export default function Page() {
	const currentMonthString = MONTHS[new Date().getMonth()];

	const fruitList = fruitsAndVegetables[currentMonthString].fruits;
	const vegetableList = fruitsAndVegetables[currentMonthString].vegetables;

	return (
		<View className="flex-1">
			<Heading level={3} className="pb-5">
				Fruits de saison :
			</Heading>

			<Heading level={3} className="pb-5">
				Légumes de saison :
			</Heading>
		</View>
	);
}
