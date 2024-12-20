import { P } from "@/components/ui/p";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View } from "react-native";
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
		<View>
			<P>params : {params.id}</P>
		</View>
	);
}
