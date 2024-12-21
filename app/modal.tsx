import { P } from "@/components/ui/p";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View } from "react-native";
import { Image } from "expo-image";
import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";
import { router } from "expo-router";
import fruits_vegetables_months from "@/utils/data/fruits_vegetables_months";
import Animated, { ReduceMotion, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
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

export default function Modal() {
	const width = useSharedValue(0);
	const params = useLocalSearchParams<Product>();
	if (!params.id || !params.type) return router.back();

	const product = params.type === "fruit" ? fruits[params.id] : vegetables[params.id];

	// get the months where the product is available
	const months = Object.entries(fruits_vegetables_months)
		.filter(([_, productType]) =>
			productType[params.type === "fruit" ? "fruits" : "vegetables"].some((item) => item.id === params.id)
		)
		.map(([month]) => month);

	React.useEffect(() => {
		width.value = withSpring(100, {
      duration: 1600,
      dampingRatio: 0.6,
      reduceMotion: ReduceMotion.System,
		});
	}, []);

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

			<View className="w-20 h-4 rounded-full bg-primary/50 border-2 border-primary" />

			{/* months */}
			<P className="text-lg font-semibold">{months.join(", ")}</P>

			{/* product name */}
			<Animated.View
				style={{
					width,
					height: 100,
					backgroundColor: "violet",
				}}
			/>

			{/* co2 information */}
			<View className="mt-4 flex-row items-center space-x-2">
				<View className="h-3 w-3 rounded-full bg-primary" />
				<P className="text-lg">{product.co2} kg CO₂e</P>
			</View>
		</View>
	);
}
