import { cut } from "nodejs-jieba";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Leonzhao's Blog",
      description:
        "Some blogs about Programming, Algorithm, Game Development, Artificial Intelligence, and Start-up",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Leonzhao的博客",
      description: "一些有关于编程、算法、游戏开发、人工智能和创业的博客",
    },
  },

  theme,
  // Enable it with pwa
  // shouldPrefetch: false,
  plugins: [
    searchProPlugin({
      indexContent: true,
      indexLocaleOptions: {
        "/zh/": {
          // 使用 nodejs-jieba 进行分词
          tokenize: (text, fieldName) =>
            fieldName === "id" ? [text] : cut(text, true),
        },
      },
    }),
  ],
});
