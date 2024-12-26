import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Link } from "expo-router";
import React from "react";


interface AnimatedScreenProps {
	setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnimationSplashscreen({ setShowAnimation }: AnimatedScreenProps) {
	const animationRef = React.useRef<LottieView>(null);

	React.useEffect(() => {
		// weird bug, i have to set the animation for the next tick 
		// otherwise the animation is not launching after splashScreen
		setTimeout(() => {
			animationRef.current?.play();
		}, 1);
	}, []);

	return (
		<View className="flex-1 items-center justify-center">
			<Link href="/">debug</Link>
			<LottieView
				ref={animationRef}
				loop={false}
				autoPlay
				style={{
					width: 200,
					height: 200,
					backgroundColor: "#ffffff",
				}}
				source={require("@/resources/cooking2.lottie")}
				onAnimationFinish={() => setShowAnimation(false)}
			/>
		</View>
	);
}
