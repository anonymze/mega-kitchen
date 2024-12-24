import { P } from "@/components/ui/p";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";
import fruits_vegetables_months from "@/utils/data/fruits_vegetables_months";
import Animated, {
	clamp,
	ReduceMotion,
	useSharedValue,
	withDelay,
	withSpring,
} from "react-native-reanimated";
import React from "react";

type Product =
	| {
			id: keyof typeof fruits;
			type: "fruit";
	  }
	| {
			id: keyof typeof vegetables;
			type: "vegetable";
	  };

// MANGUE
const MAX_KGS_CO2 = 10.6;

export default function Modal() {
	const width = useSharedValue<`${number}%`>("0%");
	const params = useLocalSearchParams<Product>();
	if (!params.id || !params.type) return router.back();

	const product = params.type === "fruit" ? fruits[params.id] : vegetables[params.id];

	// get the months where the product is available
	const months = Object.entries(fruits_vegetables_months)
		.filter(([_, productType]) =>
			productType[params.type === "fruit" ? "fruits" : "vegetables"].some((item) => item.id === params.id)
		)
		.map(([month]) => month);

	const percentage = (product.co2 / MAX_KGS_CO2) * 100;
	// duration is between 500ms and 600ms
	const duration = clamp(percentage * 20, 500, 600);
	// max damping 0.7
	const dampingRatio = Math.min(0.7, 0.4 + percentage / 200);

	width.value = withDelay(
		240,
		withSpring(`${percentage}%` as `${number}%`, {
			duration,
			dampingRatio,
			reduceMotion: ReduceMotion.System,
		})
	);

	return (
		<View className="p-4">
			{/* product icon/image */}
			<Image
				style={{
					width: "100%",
					height: 100,
					marginBottom: 10,
				}}
				source={product.image}
				contentFit="contain"
			/>
			<P className="mb-6 text-xl font-semibold text-center">{product.label.FR}</P>

			<View />

			{/* months */}
			<P className="text-lg font-semibold">{months.join(", ")}</P>

			{/* product name */}
			<View className="w-full">
				<Animated.View
					className="h-4 rounded-full bg-primary/50 border-2 border-primary"
					style={{
						width,
					}}
				/>
			</View>

			{/* co2 information */}
			<View className="mt-4 flex-row items-center space-x-2">
				<View className="h-3 w-3 rounded-full bg-primary" />
				<P className="text-lg">{product.co2} kg CO₂e</P>
			</View>
		</View>
	);
}
