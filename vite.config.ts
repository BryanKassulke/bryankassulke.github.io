import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: "esnext"
  },
  assetsInclude: ["**/*.glb"],
});
