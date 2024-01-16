module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				starnotes: {
					primary: "#ab9dff",

					secondary: "#4c61ff",

					accent: "#ffb6ff",

					neutral: "#f3ede0",

					"base-100": "#312e81",

					info: "#67e8f9",

					success: "#86efac",

					warning: "#fdba74",

					error: "#f87171",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
