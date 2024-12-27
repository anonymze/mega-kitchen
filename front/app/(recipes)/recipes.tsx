import { View } from "react-native";
import { Link } from "expo-router";


interface Props {}

export default function Page(props: Props) {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Link href="/frigo">Retour</Link>
		</View>
	);
}
