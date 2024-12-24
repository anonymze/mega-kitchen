import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AnimationSplashscreen from "@/components/animation-splashscreen";
import "react-native-reanimated";
import "@/styles/app.css";
import { ScrollView } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [showAnimation, setShowAnimation] = useState(true);
	const [loaded] = useFonts({
		AtkinsonRegular: require("@/assets/fonts/atkinson/Atkinson-Hyperlegible-Regular-102a.woff2"),
		AtkinsonBold: require("@/assets/fonts/atkinson/Atkinson-Hyperlegible-Bold-102a.woff2"),
		AtkinsonItalic: require("@/assets/fonts/atkinson/Atkinson-Hyperlegible-Italic-102a.woff2"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView className="flex-1 p-4">
				{showAnimation ? (
					<AnimationSplashscreen setShowAnimation={setShowAnimation} />
				) : (
					<Stack
						screenOptions={{
							contentStyle: { backgroundColor: "#ffffff" },
							headerShown: false,
						}}
					>
						<Stack.Screen name="index" />
						<Stack.Screen
							name="modal"
							options={{
								presentation: "modal",
							}}
						/>
					</Stack>
				)}
			</SafeAreaView>
			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
}
