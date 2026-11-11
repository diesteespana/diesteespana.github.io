import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Todo en un solo index.html (JS y CSS en linea): asi se abre con doble clic desde el
// escritorio (file:// no deja cargar modulos sueltos) y GitHub Pages lo sirve igual.
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { outDir: "dist", emptyOutDir: true },
});
