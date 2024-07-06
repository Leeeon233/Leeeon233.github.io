import Giscus from "@giscus/react";
import React from "react";
import { useEffect, useState } from "react";

export default function GiscusComment() {
  const [theme, setTheme] = useState<boolean | string>(false);
  useEffect(() => {
    if (window.location !== undefined) {
      const theme =
        document.documentElement.attributes.getNamedItem("data-theme")?.value;

      if (theme) {
        setTheme(theme);
      }
    }
  }, [theme]);
  return theme ? (
    <div className="mt-12 w-full border-t border-gray-200 pt-6 dark:border-gray-800">
      <Giscus
        id="comments"
        repo="Leeeon233/Leeeon233.github.io"
        repoId="R_kgDOHnZxWw"
        category="Announcements"
        categoryId="DIC_kwDOHnZxW84CgjOS"
        mapping="url"
        term="Welcome to leon7hao comment!"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  ) : (
    <></>
  );
}
