import { Platform, View } from "react-native";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";
import React from "react";


interface AnimatedScreenProps {
	duration?: number;
	setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnimationSplashscreen({ setShowAnimation, duration = 2000 }: AnimatedScreenProps) {
	const animationRef = React.useRef<LottieView>(null);

	React.useEffect(() => {
		setTimeout(() => {
			if (Platform.OS === "android") {
				animationRef.current?.reset();
			} else {
				animationRef.current?.resume();
			}
		}, duration);
	}, []);

	return (
		<View className="flex-1 items-center justify-center">
			<LottieView
				ref={animationRef}
				loop={true}
				autoPlay
				style={{
					width: 200,
					height: 200,
					backgroundColor: "#ffffff",
				}}
				source={require("@/resources/cooking.json")}
				onAnimationFinish={() => setShowAnimation(false)}
			/>
		</View>
	);
}
