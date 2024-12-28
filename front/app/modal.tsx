import Animated, { clamp, ReduceMotion, useAnimatedStyle, useSharedValue, withDelay, withSpring, } from "react-native-reanimated";
import fruits_vegetables_months from "@/utils/data/fruits_vegetables_months";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Heading } from "@/components/ui/heading";
import vegetables from "@/utils/data/vegetables";
import fruits from "@/utils/data/fruits";
import { P } from "@/components/ui/p";
import { router } from "expo-router";
import { View } from "react-native";
import { Image } from "expo-image";
import React from "react";


type Product =
	| {
			id?: string;
			type?: "fruit";
	  }
	| {
			id?: string;
			type?: "vegetable";
	  };

const MAX_KGS_CO2 = 15;

export default function Modal() {
	const width = useSharedValue<`${number}%`>("0%");
	const params = useLocalSearchParams<Product>();

	const product =
		params.type === "fruit"
			? fruits.find((fruit) => fruit.id === params.id)
			: vegetables.find((vegetable) => vegetable.id === params.id);

	if (!product) return router.back();

	const percentage = (product.co2 / MAX_KGS_CO2) * 100;
	// duration is between 500ms and 600ms
	const duration = clamp(percentage * 20, 500, 600);
	// max damping 0.7
	const dampingRatio = Math.min(0.7, 0.4 + percentage / 200);

	// get the months where the product is available
	const months = Object.entries(fruits_vegetables_months)
		.filter(([_, productType]) =>
			productType[params.type === "fruit" ? "fruits" : "vegetables"].some((item) => item.id === params.id)
		)
		.map(([month]) => month);

	// it does not re render the component
	width.value = withDelay(
		250,
		withSpring(`${percentage}%` as `${number}%`, {
			duration,
			dampingRatio,
			reduceMotion: ReduceMotion.System,
		})
	);

	return (
		<View className="px-4 py-6">
			<Image
				style={{
					width: "100%",
					height: 100,
					marginBottom: 10,
				}}
				source={product.image}
				contentFit="contain"
			/>

			<Heading level={1} className="mb-6 text-center">
				{product.label.FR}
			</Heading>

			<P className="mb-6">{product.description}</P>

			<View className="flex-row items-center gap-2 w-full mb-8">
				<Animated.View
					className="h-4 rounded-full bg-primary/50 border-2 border-primary"
					style={{
						width,
					}}
				/>
				<P className="text-primary text-xl font-bold">
					{product.co2} <P className="text-sm">kg CO₂e</P>
				</P>
			</View>

			<Heading level={2} className="mb-4">
				Mois de consommation conseillés :
			</Heading>

			<View className="flex-row flex-wrap items-center gap-3 w-full mb-6">
				{months.map((month) => (
					<View key={month} className="p-2 border-2 border-primary rounded-md">
						<P>{month}</P>
					</View>
				))}
			</View>
		</View>
	);
}
