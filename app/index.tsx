import { Heading } from "@/components/ui/heading";
import { View } from "react-native";
import fruitsAndVegetables from "@/utils/data/fruits_vegetables";
import { MONTHS } from "@/utils/data/months";
import Card from "@/components/card";
import { P } from "@/components/ui/p";

// 221 vegetables
// 162 fruits

export default function Page() {
	const currentMonthString = MONTHS[new Date().getMonth()];

	const fruitList = fruitsAndVegetables[currentMonthString].fruits;
	const vegetableList = fruitsAndVegetables[currentMonthString].vegetables;

	return (
		<View className="flex-1">
			<Heading level={2} className="pb-5">
				Fruits & légumes de saison :
			</Heading>

			<P>Les fruits et légumes sont classés par ordre d'émission de CO2.</P>

			<Heading level={3} className="pb-5">
				Fruits :
			</Heading>

			<View className="flex-row items-center gap-2">
				{fruitsAndVegetables["january"].fruits.map((fruit) => {
					return <Card key={fruit.id} iconName={fruit.image} alt="fruit" />;
				})}
			</View>

			<Heading level={3} className="pb-5">
				Légumes :
			</Heading>
		</View>
	);
}
