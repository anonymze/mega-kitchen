import { Heading } from "@/components/ui/heading";
import { View, ActivityIndicator } from "react-native";
import { RefrigeratorIcon } from "lucide-react-native";
import Dom from "@/components/ui/domcompo";
import React from "react";

interface Props {}

const data = [
	{ label: "Item 1", value: "1" },
	{ label: "Item 2", value: "2" },
	{ label: "Item 3", value: "3" },
	{ label: "Item 4", value: "4" },
	{ label: "Item 5", value: "5" },
	{ label: "Item 6", value: "6" },
	{ label: "Item 7", value: "7" },
	{ label: "Item 8", value: "8" },
];

export default function Page() {
	const [isLoading, setIsLoading] = React.useState(true);

	return (
		<View style={{ flex: 1 }}>
			<Heading level={1} className="mb-6">
				<RefrigeratorIcon color="red" size={48} /> Compose avec ton frigo
			</Heading>

			{isLoading && (
				<View className="flex-1 items-center justify-center">
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
