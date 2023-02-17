import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "src/main.ts",
            ],
            refresh: true,
        }),
        vue(),
        vueJsx({}),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        createSvgIconsPlugin({
            iconDirs: [fileURLToPath(new URL('src/assets/svgs', import.meta.url)),],
            symbolId: 'svg-[dir]-[name]',
            svgoOptions: true
        })
    ],
    resolve: {
        alias: [
            {
                find: /\@\//,
                replacement: fileURLToPath(new URL("./src/", import.meta.url)),
            },
        ],
    },
});
