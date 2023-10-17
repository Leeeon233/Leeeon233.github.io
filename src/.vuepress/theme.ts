import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

const MR_HOPE_AVATAR =
  '<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient gradientTransform="matrix(.2478 .78133 -2.54797 .63622 910.35 281.58)" gradientUnits="userSpaceOnUse" id="a" x1="37.827" x2="159.988" y1="272.916" y2="274.63"><stop offset=".75" stop-color="#e33939"/><stop offset=".998" stop-color="#fff"/></linearGradient><linearGradient gradientTransform="matrix(.13814 .80797 2.55599 -.6032 34.087 494.369)" gradientUnits="userSpaceOnUse" id="b" x1="37.827" x2="159.988" y1="272.916" y2="274.63"><stop offset=".815" stop-color="#e33939"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><path d="M135.637 588.067c-48.891-201.334 74.605-404.162 275.837-453.028 201.233-48.866 403.998 74.734 452.889 276.068 48.892 201.335-74.606 404.162-275.838 453.029-201.233 48.866-403.997-74.734-452.888-276.069Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M596.076 197.044c-3.342-56.09 56.897-77.831 89.017-51.361m-410.65 128.819c-22.753-51.377-86.256-43.07-102.659-4.816" fill="none" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/><path d="M833.568 288.02c.05 18.046-12.584 30.699-21.346 32.211-8.762 1.512-17.031-1.099-18.584-1.341 0 0-61.363-6.103-105.627 6.921-44.265 13.026-87.04 47.387-94.637 51.892-6.627 3.928-29.112 7.697-44.462-12.938-15.351-20.636.024-41.526.024-41.526s12.685-18.279 40.771-35.123c28.088-16.844 24.624-13.226 52.326-25.696 15.247-6.865 43.319-14.186 67.429-17.069 25.193-3.011 46.348-1.384 57.673.769 22.165 4.212 28.632 5.93 39.169 9.229 12.451 3.898 27.214 14.516 27.264 32.671Z" fill="#fff" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M558.351 345.632c-3.458-14.237 5.214-28.566 19.367-32.003 14.154-3.437 28.43 5.32 31.887 19.557 3.458 14.238-5.212 28.567-19.367 32.004-14.152 3.437-28.43-5.319-31.887-19.558Z" fill="#6d5e56" fill-rule="evenodd" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.268"/><path d="M220.249 483.416c46.81-11.689 91.323-.467 99.42 25.064 8.098 25.532-23.286 55.706-70.097 67.393-46.811 11.689-91.323.467-99.42-25.064-8.097-25.532 23.286-55.706 70.097-67.393Z" fill="url(#a)" fill-rule="evenodd" opacity=".261"/><path d="M739.9 357.226c-46.959 11.082-81.367 41.469-76.853 67.871 4.514 26.402 46.241 38.821 93.198 27.738 46.958-11.081 81.366-41.467 76.853-67.869-4.514-26.403-46.241-38.821-93.198-27.74Z" fill="url(#b)" fill-rule="evenodd" opacity=".261"/><path d="M400.934 398.917c-.599 18.034-13.681 30.218-22.494 31.409-8.812 1.192-16.982-1.716-18.526-2.014 0 0-61.109-8.334-105.819 3.07-44.709 11.404-88.696 44.181-96.452 48.406-6.763 3.683-29.372 6.632-43.972-14.546-14.6-21.18 1.519-41.494 1.519-41.494s13.335-17.803 42.013-33.612c28.677-15.809 25.085-12.319 53.222-23.772 15.484-6.304 43.803-12.598 68.005-14.6 25.288-2.093 46.373.305 57.616 2.867 22 5.016 28.401 6.968 38.813 10.649 12.304 4.348 26.677 15.496 26.075 33.637Z" fill="#fff" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M129.05 445.546c-3.458-14.239 5.213-28.566 19.367-32.003 14.153-3.437 28.429 5.318 31.887 19.557 3.458 14.238-5.213 28.566-19.367 32.003-14.153 3.437-28.43-5.318-31.887-19.557Z" fill="#6d5e56" fill-rule="evenodd" stroke="#6d5e56" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.268"/><path d="M424.381 696.386s64.427 13.646 101.996 5.757C640.653 678.146 690.8 521.894 690.8 521.894" fill="none" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"/><path d="M796.04 666.774s-10.734-44.165-41.405-11.348c-9.681 10.359-10.438 40.604-28.217 81.89-15.942 37.02-39.564 60.728-42.938 76.063-3.374 15.335.451 35.992 26.352 41.537 25.902 5.545 41.967-23.381 41.967-23.381l44.241-164.761Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/><path d="M793.337 664.734c-37.075 160.045-51.73 163.145-40.343 184.845 11.387 21.701 51.417 33.716 71.876-7.313 6.734-13.505-1.31-43.317-1.511-78.077-.307-53.06 16.865-86.111 10.403-98.1-15.332-28.452-39.377-5.875-40.425-1.355Z" fill="#fde68a" fill-rule="evenodd" stroke="#d08819" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/></svg>';

export default hopeTheme({
  hostname: "https://leonzhao.cn",

  author: {
    name: "Leon Zhao",
    url: "https://leonzhao.cn",
    email: "leeeon233@gmail.com",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/avatar.png",

  // repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  blog: {
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "mailto:info@example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/Leeeon233",
      // Gitlab: "https://example.com",
      Gmail: "mailto:leeeon233@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      Twitter: "https://twitter.com/lzon233",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      Zhihu: "https://www.zhihu.com/people/ai-dao-te",
      // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
      JiKe: [
        "https://jike.city/leonz",
        `<svg viewBox="0 0 173 173" xmlns="http://www.w3.org/2000/svg" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
<g><path style="opacity:0.991" fill="#fee412" d="M 74.5,-0.5 C 82.1667,-0.5 89.8333,-0.5 97.5,-0.5C 138.833,8.16667 163.833,33.1667 172.5,74.5C 172.5,82.1667 172.5,89.8333 172.5,97.5C 163.833,138.833 138.833,163.833 97.5,172.5C 89.8333,172.5 82.1667,172.5 74.5,172.5C 33.1667,163.833 8.16667,138.833 -0.5,97.5C -0.5,89.8333 -0.5,82.1667 -0.5,74.5C 8.16667,33.1667 33.1667,8.16667 74.5,-0.5 Z"/></g>
<g><path style="opacity:1" fill="#fdfdfd" d="M 101.5,30.5 C 101.5,50.8333 101.5,71.1667 101.5,91.5C 101.5,92.1667 101.5,92.8333 101.5,93.5C 100.944,108.112 94.944,119.946 83.5,129C 78.5369,133.142 73.2036,136.642 67.5,139.5C 62.7457,134.405 58.7457,128.738 55.5,122.5C 55.6082,121.558 55.9415,120.725 56.5,120C 67.3734,114.632 74.3734,106.132 77.5,94.5C 78.4781,73.1935 78.8114,51.8601 78.5,30.5C 86.1667,30.5 93.8333,30.5 101.5,30.5 Z"/></g>
<g><path style="opacity:1" fill="#c8f3f9" d="M 101.5,30.5 C 104.777,30.2161 107.943,30.5495 111,31.5C 111.5,40.1603 111.666,48.8269 111.5,57.5C 108.421,56.7183 105.421,56.3849 102.5,56.5C 102.828,68.3453 102.495,80.012 101.5,91.5C 101.5,71.1667 101.5,50.8333 101.5,30.5 Z"/></g>
<g><path style="opacity:1" fill="#87ddf4" d="M 111.5,57.5 C 111.773,69.8706 111.44,82.2039 110.5,94.5C 107.386,94.669 104.386,94.3357 101.5,93.5C 101.5,92.8333 101.5,92.1667 101.5,91.5C 102.495,80.012 102.828,68.3453 102.5,56.5C 105.421,56.3849 108.421,56.7183 111.5,57.5 Z"/></g>
<g><path style="opacity:1" fill="#37bfe8" d="M 101.5,93.5 C 104.386,94.3357 107.386,94.669 110.5,94.5C 110.065,108.313 105.231,120.313 96,130.5C 88.9253,136.743 81.4253,142.41 73.5,147.5C 70.5197,145.527 68.5197,142.86 67.5,139.5C 73.2036,136.642 78.5369,133.142 83.5,129C 94.944,119.946 100.944,108.112 101.5,93.5 Z"/></g>
</svg>`,
      ],
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "Default footer",

      displayFooter: false,

      blog: {
        description: `<div align="left" style="margin: 10px"><p>🪙 Startup <a target="_blank" href="https://loro.dev">loro.dev</a></p>
<p>💎 Full stack development, collaborative algorithm, CV algorithm</p>
<p>🎮 Love playing games</p>
<p>🧐 Interested in game development, UX, and AI</p></div>`,
        // intro: "/intro.html",
      },

      // metaLocales: {
      //   editLink: "Edit this page on GitHub",
      // },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      // footer: "默认页脚",

      displayFooter: false,

      blog: {
        description: `<div align="left" style="margin: 10px"><p>🪙创业中 <a target="_blank" href="https://loro.dev">loro.dev</a></p>
<p>💎全栈开发，协作算法，CV算法</p>
<p>🎮喜欢玩游戏</p>
<p>🧐对游戏开发，交互设计，AI应用感兴趣</p></div>`,
        // intro: "/zh/intro.html",
      },

      // page meta
      // metaLocales: {
      //   editLink: "在 GitHub 上编辑此页",
      // },
    },
  },
  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //     "/zh/demo/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    blog: {
      sidebar: false,
    },

    comment: {
      // You should generate and use your own comment service
      provider: "Waline",
      serverURL: "https://waline-blog-adkoanq5z-leeeon233.vercel.app/",
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      revealjs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
