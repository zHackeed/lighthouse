export const THEME_STORAGE_KEY = "theme";

//https://nextjs.org/docs/app/guides/preventing-flash-before-hydration#themes
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
