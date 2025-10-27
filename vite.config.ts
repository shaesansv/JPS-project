import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // bind to localhost explicitly so the dev server and HMR websocket are reachable from the browser
    host: "localhost",
    // use a standard Vite dev port that is less likely to be blocked in some environments
    port: 5173,
    // explicit HMR settings to ensure the client connects to the correct host/port/protocol
    hmr: {
      host: "localhost",
      protocol: "ws",
      port: 5173,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
