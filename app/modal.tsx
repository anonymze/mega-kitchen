import { P } from "@/components/ui/p";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View, Image } from "react-native";
import fruits from "@/utils/data/fruits";
import vegetables from "@/utils/data/vegetables";
import { router } from "expo-router";

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
	const params = useLocalSearchParams<Product>();
	if (!params.id || !params.type) return router.back();

	const product = params.type === "fruit" ? fruits[params.id] : vegetables[params.id];

	return (
		<View className="flex-1 bg-white p-4">
			<View className="flex-row items-center space-x-4 border-b border-gray-200 pb-4">
				{/* product icon/image */}
				<View className="h-16 w-16 items-center justify-center">
					<Image 
						source={product.image} 
						className="h-12 w-12"
						resizeMode="contain"
					/>
				</View>

				{/* product name */}
				<View>
					<P className="text-xl font-semibold">{product.label.FR} !</P>
				</View>
			</View>

			{/* co2 information */}
			<View className="mt-4 flex-row items-center space-x-2">
				<View className="h-3 w-3 rounded-full bg-primary" />
				<P className="text-lg">
					{product.co2} kg CO₂e
				</P>
			</View>
		</View>
	);
}
