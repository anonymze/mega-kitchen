# MEGA KITCHEN

The most complete application about cooking food.

## Commands

<!-- can solve some problems with the project dependencies -->
npx expo start -c
pnpm start --reset-cache
pnpm dlx expo prebuild

<!-- generate apk handled by eas (sign the app automaticly etc...) -->
<!-- --profile development can debug, is not minified etc... -->
eas build --platform android --profile development
eas build --platform all --profile production