import type { Config } from "tailwindcss";
import tailwindCssFormsPlugin from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.ts"],
  theme: {
    extend: {},
  },
  plugins: [tailwindCssFormsPlugin()],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
