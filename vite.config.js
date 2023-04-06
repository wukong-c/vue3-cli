import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "node:path";
import Components from "unplugin-vue-components/vite";
import fullImportPlugin from "./config/fullImportPlugin";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { createHtmlPlugin } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "./",
    server: {
      host: true,
      port: "3000",
      proxy: {},
      hmr: true,
    },
    build: {
      outDir: "dist/output",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    plugins: [
      vue(),
      eslintPlugin({
        include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
      }),
      //开发环境全量引入，打包自动引入组件及其样式
      mode === "development"
        ? fullImportPlugin()
        : Components({
            resolvers: [ElementPlusResolver()],
          }),
      //手动引入ELMessage等时 自动引入样式
      ElementPlus({
        useSource: true,
      }),
      // 自动导入vue、vue-router、pinia相关api
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        // 是否生成声明文件
        dts: "./config/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./config/.eslintrc-auto-import.json",
        },
      }),
      //html插件
      createHtmlPlugin({
        minify: true,
        entry: "src/main.js",
        template: "index.html",
        inject: {
          data: {
            title: env.VITE_TITLE,
          },
        },
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/element/index.scss" as *;
          `,
        },
      },
    },
  };
});
