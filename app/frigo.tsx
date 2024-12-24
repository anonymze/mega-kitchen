import { Heading } from "@/components/ui/heading";
import { View, ActivityIndicator } from "react-native";
import { RefrigeratorIcon } from "lucide-react-native";
import Dom from "@/components/ui/domcompo";
import React from "react";

interface Props {}

const data = [
	{ key: "1", value: "Mobiles", disabled: true },
	{ key: "2", value: "Appliances" },
	{ key: "3", value: "Cameras" },
	{ key: "4", value: "Computers", disabled: true },
	{ key: "5", value: "Vegetables" },
	{ key: "6", value: "Diary Products" },
	{ key: "7", value: "Drinks" },
];

export default function Page() {
	const [isLoading, setIsLoading] = React.useState(true);

	return (
		<View style={{ flex: 1 }}>
			<Heading level={1} className="mb-6">
				<RefrigeratorIcon color="red" size={48} /> Compose avec ton frigo
			</Heading>

			{isLoading && (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" />
				</View>
			)}

			<Dom
				dom={{
					onLoadEnd: () => setIsLoading(false),
				}}
			/>
		</View>
	);
}
