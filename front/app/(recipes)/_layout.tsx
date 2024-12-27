import AnimationSplashscreen from "@/components/animation-splashscreen";
import { Slot } from "expo-router";
import React from "react";


export default function Layout() {
	const [showAnimation, setShowAnimation] = React.useState(true);
	
	return <>{showAnimation ? <AnimationSplashscreen setShowAnimation={setShowAnimation} /> : <Slot />}</>;
}
