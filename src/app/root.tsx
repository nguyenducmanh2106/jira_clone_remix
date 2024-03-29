import { CSSProperties, useEffect } from "react";
import type { MetaFunction, LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import cx from "classix";
import { Theme, Preference, ThemeProvider, useTheme } from "@app/store/theme.store";
import { getThemeSession } from "./session-storage/theme-storage.server";
// import { ThemeProvider, useTheme } from "./store/theme.store";
import { Error404 } from "./components/error-404";
import { Error500 } from "./components/error-500";
import styles from "./styles/app-compiled.css";
import fonts from "./styles/fonts.css";
import AgGridStyles from "ag-grid-community/styles/ag-grid.css";
import AgThemeAlpineStyles from "ag-grid-community/styles/ag-theme-alpine.min.css";
import AgThemeBalhamStyles from "ag-grid-community/styles/ag-theme-balham.min.css";
import { Provider } from "react-redux";
import store from "./store/app.store";

export const links = () => {
  return [
    { rel: "stylesheet", href: fonts },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: AgGridStyles },
    { rel: "stylesheet", href: AgThemeBalhamStyles },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ];
};

export const meta: V2_MetaFunction = () => {
  const title = "Project";
  const description =
    "Task manager application inspired in Jira. Side project made with Remix, React, Tailwind, TypeScript and more.";
  const image =
    "https://jira-clone.fly.dev/static/images/select-theme-light.png";
  const url = "https://jira-clone.fly.dev";

  // return {
  //   charset: "utf-8",
  //   viewport: "width=device-width,initial-scale=1",
  //   title: title,
  //   description: description,
  //   "robots": "index,follow",
  //   "og:url": url,
  //   "og:type": "website",
  //   "og:site_name": title,
  //   "og:title": title,
  //   "og:description": description,
  //   "og:image": image,
  //   "twitter:card": "summary_large_image",
  //   "twitter:site": url,
  //   "twitter:domain": "jira-clone.fly.dev",
  //   "twitter:title": title,
  //   "twitter:description": description,
  //   "twitter:image": image,
  //   "twitter:image:width": "951",
  //   "twitter:image:height": "696",
  //   "twitter:image:alt": title,
  //   "twitter:creator": "@Jack_DanielSG",
  //   "twitter:creator:id": "Jack_DanielSG",
  // };
  return [
    {
      charset: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: title },
    {
      name: "description",
      content: description,
    },
    { name: "robots", content: "index,follow" },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: title },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: url },
    { name: "twitter:domain", content: "jira-clone.fly.dev" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:width", content: "951" },
    { name: "twitter:image:height", content: "696" },
    { name: "twitter:image:alt", content: title },
    { name: "twitter:creator", content: "@Jack_DanielSG" },
    { name: "twitter:creator:id", content: "Jack_DanielSG" },
  ]
};

type LoaderData = {
  theme?: Theme;
  preference?: Preference;
};
export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const { theme, preference } = themeSession.getTheme();
  return json<LoaderData>({ theme, preference });
};

export default function AppWithProviders() {
  const { theme, preference } = useLoaderData<LoaderData>();
  return (
    <Provider store={store}>
      <ThemeProvider specifiedTheme={theme} specifiedPreference={preference}>
        <App />
      </ThemeProvider>
    </Provider>
  );
}

const App = (): JSX.Element => {
  const loaderData = useLoaderData<LoaderData>();
  const { theme: sessionTheme, preference: sessionPreference } = loaderData;
  const { theme } = useTheme();
  const fetcher = useFetcher();
  const isDarkTheme = theme === Theme.DARK;

  useEffect(() => {
    // To avoid missmatch between server and client, theme is loaded
    // from cookie session. On the first visit, the theme is not stored
    // in the session, so we got it from system preference and set it.
    // Next time, the theme will be loaded from session and this won't run.
    if (sessionTheme && sessionPreference === Preference.SELECTED) return;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? Theme.DARK
      : Theme.LIGHT;

    fetcher.submit(
      { theme: systemTheme, preference: Preference.SYSTEM },
      { action: "action/set-theme", method: "post" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en" className={cx("h-full", isDarkTheme && Theme.DARK)}>
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined"
          ? "__STYLES__"
          : null}
      </head>
      <body className="h-full font-primary text-font-main dark:bg-dark-300 dark:text-font-main-dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{
            __html: !sessionTheme
              ? `
                (function () {
                  if (typeof window === 'undefined') return;

                  const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    
                  if (isSystemThemeDark) {
                    const htmlElement = document.documentElement;
                    htmlElement.classList.add('dark');
                  }
                })();
              `
              : "",
          }}
        />
      </body>
    </html>
  );
};

const errorComponentStyle: CSSProperties = {
  maxWidth: "500px",
  width: "80%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#0052cc",
  fontFamily: "sans-serif",
  fontWeight: "bold",
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const errorMessage =
    "It seems there is a critical error! Please try again or contact me at: danielserrano.contacto@gmail.com";

  return (
    // Inline styles because tailwind is not loaded at this point
    <div style={errorComponentStyle}>
      <Error500 message={errorMessage} href="/" />
    </div>
  );
}

export function CatchBoundary() {
  return (
    <html>
      <head>
        <title>Oops! Not found</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={errorComponentStyle}>
          <Error404
            message="It seems that you have lost! Go to the main page"
            href="/"
          />
        </div>
      </body>
    </html>
  );
}
