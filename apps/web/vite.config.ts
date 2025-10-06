import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    tailwindcss(),
    react(),
    viteTsconfigPaths(),
  ],
  base: "/tunein-app/",
});
