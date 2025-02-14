import { Pressable } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";


export function ButtonGradient({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
	return (
		<Pressable onPress={onPress}>
			<LinearGradient style={styles.gradient} colors={["#000", "blue"]}>
				<Text style={styles.text}>{children}</Text>
			</LinearGradient>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	gradient: {
		borderRadius: 99,
		padding: 18,
		alignItems: "center",
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
