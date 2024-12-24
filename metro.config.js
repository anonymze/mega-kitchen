const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Adds support for files that are not supported by base config
config.resolver.assetExts.push(
  'lottie',
  'woff2'
);

module.exports = withNativeWind(config, { input: "./styles/app.css" });
