module.exports = {
	mode: "jit",
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				print: { raw: "print" },
				// => @media print { ... }
			},
			animation: {
				progress: "progress 1s ease-out infinite",
			},
			keyframes: {
				progress: {
					"0%": { width: "0" },
					"100%": { width: "100%" },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
