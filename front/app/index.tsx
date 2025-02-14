import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, } from "react-native-reanimated";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/component/ScrollView";
import fruitsAndVegetables from "@/utils/data/fruits_vegetables_months";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { Button, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, Stack } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { MONTHS } from "@/utils/data/months";
import Card from "@/components/ui/card";
import { P } from "@/components/ui/p";
import React from "react";


export default function Page() {
	const animatedRef = useAnimatedRef<any>();
	const scroll = useScrollViewOffset(animatedRef);
	const style = useAnimatedStyle(() => ({
		transform: [{ translateY: interpolate(scroll.value, [0, 100], [50, 0], "clamp") }],
	}));

	const currentMonthString = MONTHS[new Date().getMonth()];

	const fruitList = fruitsAndVegetables[currentMonthString].fruits;
	const vegetableList = fruitsAndVegetables[currentMonthString].vegetables;

	return (
		<Animated.ScrollView
			ref={animatedRef}
			className="flex-1 p-4"
			bounces={true}
			showsVerticalScrollIndicator={false}
		>
			<Stack.Screen
				options={{
					headerTitle: (props) => {
						console.log(props);
						return (
							<View
								style={{
									overflow: "hidden",
									paddingBottom: 9,
									marginBottom: -9,
								}}
							>
								<Text>Mega Kitchen</Text>
							</View>
						);
					},
				}}
			/>
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

			<ButtonGradient
				onPress={() => {
					router.push("/frigo");
				}}
			>
				Continuer
			</ButtonGradient>

			<Button
				title="FRIGO - Voir les fruits et légumes de l'année"
				onPress={() => {
					router.push("/frigo");
				}}
			/>
		</Animated.ScrollView>
	);
}
