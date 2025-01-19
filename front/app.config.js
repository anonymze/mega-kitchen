module.exports = () => ({
	expo: {
		name: "mega-kitchen",
		slug: "mega-kitchen",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "myapp",
		userInterfaceStyle: "automatic",
		newArchEnabled: true,
		backgroundColor: "#ffffff",
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.anonymous.mega-kitchen",
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#0D4845",
			},
			package: "com.anonymous.megakitchen",
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		extra: {
			eas: {
				projectId: "3acc2dc4-e7d8-4ffd-b4ad-d2419686fe2f"
			}
		},
		plugins: [
			[
				"expo-router",
				{
					origin: process.env.NODE_ENV === "development" ? "http://localhost:8081" : "https://mega-kitchen.vercel.app",
				},
			],
			[
				"expo-splash-screen",
				{
					image: "./assets/images/splash.png",
					resizeMode: "contain",
					imageWidth: 220,
					backgroundColor: "#ffffff",
				},
			],
		],
		experiments: {
			typedRoutes: true,
		},
	},
});
