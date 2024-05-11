/** @type {import('tailwindcss').Config} */

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui"),
		require("tailwindcss-animate"),
		require("daisify-shadcn"),
		require("@tailwindcss/typography"),
	],
	// daisyui: {
	// 	themes: [
	// 		{
	// 			light: {
	// 				primary: "#ffda8e",
	// 				"primary-focus": "#876b17",
	// 				"primary-content": "#443509",

	// 				secondary: "#afba17",
	// 				"secondary-focus": "#a39529",
	// 				"secondary-content": "#27290f",

	// 				accent: "#856832",
	// 				"accent-focus": "#966a17",
	// 				"accent-content": "",

	// 				neutral: "#0e0e0b",
	// 				"neutral-focus": "#312f25",
	// 				"neutral-content": "#f8f4ec",

	// 				"base-100": "#1a100a",
	// 				"base-200": "#342318",
	// 				"base-300": "#7d6454",
	// 				"base-content": "#e8e8de",

	// 				info: "#1c92f2",
	// 				success: "#009485",
	// 				warning: "#ff9900",
	// 				error: "#ff5724",

	// 				"--rounded-box": "1rem",
	// 				"--rounded-btn": "1.9rem",
	// 				"--rounded-badge": "1.9rem",

	// 				"--animation-btn": ".25s",
	// 				"--animation-input": ".2s",

	// 				"--btn-text-case": "uppercase",
	// 				"--navbar-padding": ".5rem",
	// 				"--border-btn": "1px",
	// 			},
	// 			dark: {
	// 				primary: "#ffda8e",
	// 				"primary-focus": "#876b17",
	// 				"primary-content": "#443509",

	// 				secondary: "#afba17",
	// 				"secondary-focus": "#a39529",
	// 				"secondary-content": "#27290f",

	// 				accent: "#856832",
	// 				"accent-focus": "#966a17",
	// 				"accent-content": "",

	// 				neutral: "#0e0e0b",
	// 				"neutral-focus": "#312f25",
	// 				"neutral-content": "#f8f4ec",

	// 				"base-100": "#1a100a",
	// 				"base-200": "#342318",
	// 				"base-300": "#7d6454",
	// 				"base-content": "#e8e8de",

	// 				info: "#1c92f2",
	// 				success: "#009485",
	// 				warning: "#ff9900",
	// 				error: "#ff5724",

	// 				"--rounded-box": "1rem",
	// 				"--rounded-btn": "1.9rem",
	// 				"--rounded-badge": "1.9rem",

	// 				"--animation-btn": ".25s",
	// 				"--animation-input": ".2s",

	// 				"--btn-text-case": "uppercase",
	// 				"--navbar-padding": ".5rem",
	// 				"--border-btn": "1px",
	// 			},
	// 		},
	// 	],
	// },
};
