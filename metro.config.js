const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.lottie` files for Lottie Animation
  'lottie'
);

module.exports = withNativeWind(config, { input: "./styles/app.css" });
