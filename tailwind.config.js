/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				regular: ["AtkinsonRegular"],
				bold: ["AtkinsonBold"],
				italic: ["AtkinsonItalic"],
			},
		},
		colors: {
			primary: "#35a099",
		},
	},
	plugins: [],
};
