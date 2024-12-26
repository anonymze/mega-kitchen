import "react-native-reanimated";
import "@/styles/app.css";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AnimationSplashscreen from "@/components/animation-splashscreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [showAnimation, setShowAnimation] = React.useState(true);
	const [loaded] = useFonts({
		AtkinsonRegular: require("@/assets/fonts/atkinson/Atkinson-Hyperlegible-Regular-102a.woff2"),
		AtkinsonBold: require("@/assets/fonts/atkinson/Atkinson-Hyperlegible-Bold-102a.woff2"),
		AtkinsonItalic: require("@/assets/fonts/atkinson/Atkinson-Hyperlegible-Italic-102a.woff2"),
	});

	React.useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView>
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
								<Stack.Screen name="frigo" />
								<Stack.Screen name="(recipes)" options={{
									animation: "fade",
								}} />
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
		</GestureHandlerRootView>
	);
}
