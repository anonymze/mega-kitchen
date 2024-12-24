import { Heading } from "@/components/ui/heading";
import { RefrigeratorIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { Suspense } from "react";

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
	return (
		<View>
			<Heading level={1} className="mb-6">
				<RefrigeratorIcon size={24} className="text-primary" /> Compose avec ton frigo
			</Heading>

		</View>
	);
}
