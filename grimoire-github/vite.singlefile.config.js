// One-off config for a self-contained, send-it-anywhere build of the app.
// Everything — JS, CSS, all eleven font files — is inlined into one HTML
// document that works from file:// with no server and no network. Used to
// hand Axel a click-through when the deploy pipeline is unavailable.
//   npx vite build --config vite.singlefile.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "dist-single",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
  },
});
