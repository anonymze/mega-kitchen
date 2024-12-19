import { useRef } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

interface AnimatedScreenProps {
	setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnimationSplashscreen({ setShowAnimation }: AnimatedScreenProps) {
	return (
		<View className="flex-1 items-center justify-center">
			<LottieView
				autoPlay
				loop={false}
				style={{
					width: 200,
					height: 200,
					backgroundColor: "#ffffff",
				}}
				source={require("@/resources/cooking.lottie")}
				onAnimationFinish={() => setShowAnimation(false)}
			/>
		</View>
	);
}
