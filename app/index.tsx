import { Heading } from "@/components/ui/heading";
import { Button, ScrollView, View } from "react-native";
import fruitsAndVegetables from "@/utils/data/fruits_vegetables_months";
import { MONTHS } from "@/utils/data/months";
import Card from "@/components/ui/card";
import { P } from "@/components/ui/p";
import { Link, router } from "expo-router";

export default function Page() {
	const currentMonthString = MONTHS[new Date().getMonth()];

	const fruitList = fruitsAndVegetables[currentMonthString].fruits;
	const vegetableList = fruitsAndVegetables[currentMonthString].vegetables;

	return (
		<>
			<Heading level={2} className="pb-5">
				Fruits & légumes de saison :
			</Heading>

			<P>
				Les fruits et légumes sont classés par ordre d'émission de CO2 par production pour la saison en cours.
			</P>

			<Heading level={3} className="py-5">
				Fruits :
			</Heading>

			<View className="flex-row flex-wrap items-center gap-2">
				{fruitList.map((fruit) => {
					return (
						<Link
							key={fruit.id}
							href={{
								pathname: "/modal",
								params: {
									type: "fruit",
									id: fruit.id,
								},
							}}
						>
							<Card source={fruit.image} alt="fruit" />
						</Link>
					);
				})}
			</View>

			<Heading level={3} className="py-5">
				Légumes :
			</Heading>

			<View className="flex-row flex-wrap items-center gap-2 mb-6">
				{vegetableList.map((vegetable) => {
					return (
						<Link
							key={vegetable.id}
							href={{
								pathname: "/modal",
								params: {
									type: "vegetable",
									id: vegetable.id,
								},
							}}
						>
							<Card source={vegetable.image} alt="légume" />
						</Link>
					);
				})}
			</View>

			<Button
				title="Voir les fruits et légumes de l'année"
				onPress={() => {
					router.push("/frigo");
				}}
			/>
		</>
	);
}
