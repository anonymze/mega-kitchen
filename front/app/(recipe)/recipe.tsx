import AnimationSplashscreen from "@/components/animation-splashscreen";
import { View, ScrollView, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetch as expoFetch } from "expo/fetch";
import { useCompletion } from "@ai-sdk/react";
import Loader from "@/components/ui/loader";
import React from "react";


export default function Page() {
	const { prompt } = useLocalSearchParams();
	const [showAnimation, setShowAnimation] = React.useState(true);
	const { complete, completion, isLoading } = useCompletion({
		fetch: expoFetch as unknown as typeof globalThis.fetch,
		api: process.env.EXPO_PUBLIC_API_RECIPE_URL,
		onError: (error) => console.error(error, "ERROR"),
	});

	React.useEffect(() => {
		complete(prompt.toString());
	}, []);

	return (
		<>
			{showAnimation ? (
				<AnimationSplashscreen setShowAnimation={setShowAnimation} />
			) : (
				<View className="flex-1 p-4">
					<ScrollView className="flex-1">
						<Text>{completion}</Text>
					</ScrollView>
					{isLoading && <Loader fadeIn="bottom" />}
				</View>
			)}
		</>
	);
}
