import Animated, { Easing, FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming, } from "react-native-reanimated";
import { Loader2Icon } from "lucide-react-native";
import TailwindConfig from "@/tailwind.config";
import { cn } from "@/utils/libs/tailwind";
import { View } from "react-native";
import React from "react";


interface Props {
	fadeIn?: "top" | "bottom";
}

export default function Loader({ fadeIn = "bottom" }: Props) {
	const rotation = useSharedValue<number>(0);

	React.useEffect(() => {
		rotation.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.elastic(1) }), 0);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value * 360}deg` }],
	}));
	
	return (
		<View className={cn(
			"absolute left-0 right-0 flex-1 items-center",
			fadeIn === "bottom" ? "bottom-10" : "top-10",
		)}>
			<Animated.View
				entering={
					fadeIn === "top" ? FadeInUp.duration(300).springify() : FadeInDown.duration(300).springify()
				}
			>
				<Animated.View style={animatedStyle}>
					<Loader2Icon color={TailwindConfig.theme.colors.primary} size={45} />
				</Animated.View>
			</Animated.View>
		</View>
	);
}
