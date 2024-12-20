import { Image } from "expo-image";
import { View } from "react-native";

interface Props {
	source: string;
	alt: string;
}

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Card({ source }: Props) {
	return (
		<View className="w-20 h-20 p-4 border-primary border-2 rounded-full">
			<Image
				style={{
					flex: 1,
					width: "100%",
					backgroundColor: "#ffffff",
					borderRadius: 99,
				}}
				source={source}
				placeholder={{ blurhash }}
				contentFit="cover"
				transition={500}
			/>
		</View>
	);
}
