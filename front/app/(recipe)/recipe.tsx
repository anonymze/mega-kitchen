import AnimationSplashscreen from "@/components/animation-splashscreen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { View, ScrollView, Text } from "react-native";
import { Loader2Icon } from "lucide-react-native";
import { fetch as expoFetch } from "expo/fetch";
import TailwindConfig from "@/tailwind.config";
import { useCompletion } from "@ai-sdk/react";
import { Link } from "expo-router";
import React from "react";


export default function Page() {
	const [showAnimation, setShowAnimation] = React.useState(true);
	const { complete, completion, isLoading } = useCompletion({
		fetch: expoFetch as unknown as typeof globalThis.fetch,
		api: process.env.EXPO_PUBLIC_API_RECIPE_URL,
		onError: (error) => console.error(error, "ERROR"),
	});

	React.useEffect(() => {
		complete("Your predefined prompt here");
	}, []);

	return (
		<>
			{showAnimation ? (
				<AnimationSplashscreen setShowAnimation={setShowAnimation} />
			) : (
				<View className="flex-1 p-4">
					<Link href="/frigo" className="mb-6">
						<Text>Retrouver mon frigo</Text>
					</Link>
					<ScrollView className="flex-1">
						<Text>{completion}</Text>
					</ScrollView>
					<View className="absolute bottom-10 w-full">
						{isLoading && (
							<Animated.View entering={FadeInDown.duration(300).springify()}>
								<Loader2Icon
									color={TailwindConfig.theme.colors.primary}
									style={{
										marginHorizontal: "auto",
									}}
									size={45}
								/>
							</Animated.View>
						)}
					</View>
				</View>
			)}
		</>
	);
}
