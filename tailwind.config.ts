import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            zIndex: {
                100: "100",
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
