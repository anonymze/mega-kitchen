import Animated, { Easing, FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming, } from "react-native-reanimated";
import { Loader2Icon } from "lucide-react-native";
import TailwindConfig from "@/tailwind.config";
import { View } from "react-native";
import React from "react";


export default function Loader() {
	const rotation = useSharedValue<number>(0);

	React.useEffect(() => {
		rotation.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.elastic(1) }), 0);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value * 360}deg` }],
	}));
	return (
		<View className="absolute top-10 left-0 right-0 flex-1 items-center">
			<Animated.View entering={FadeInUp.duration(300).springify()}>
				<Animated.View style={animatedStyle}>
					<Loader2Icon color={TailwindConfig.theme.colors.primary} size={45} />
				</Animated.View>
			</Animated.View>
		</View>
	);
}
