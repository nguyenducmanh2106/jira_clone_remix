import { flatRoutes } from "remix-flat-routes";
/** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
//   tailwind: true,
//   serverModuleFormat: "esm", //cjs - esm
//   // ignoredRouteFiles: ["**/.*"],
//   ignoredRouteFiles: ["**/*"],
//   appDirectory: "./src/app",
//   serverDependenciesToBundle: [
//     "react-dnd",
//     "react-dnd-html5-backend",
//     "react-dnd-touch-backend",
//     "@react-dnd/invariant",
//     "dnd-core",
//     "@react-dnd/shallowequal",
//     "@react-dnd/asap",
//   ],
//   assetsBuildDirectory: "public/build",
//   publicPath: "/build/",
//   // sourceMap: true,
//   devServerPort: 8003,
//   routes: async (defineRoutes) => {
//     return flatRoutes("routes", defineRoutes, {
//       ignoredRouteFiles: ["**/*.test.{js,jsx,ts,tsx}", "**/__*.*"],
//     });
//   },
// };
export default {
  ignoredRouteFiles: ["**/*"],
  serverModuleFormat: "esm",
  tailwind: true,
  appDirectory: "./src/app",
  serverDependenciesToBundle: [
    "react-dnd",
    "react-dnd-html5-backend",
    "react-dnd-touch-backend",
    "@react-dnd/invariant",
    "dnd-core",
    "@react-dnd/shallowequal",
    "@react-dnd/asap",
  ],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes, {
      ignoredRouteFiles: ["**/*.test.{js,jsx,ts,tsx}", "**/__*.*"],
      appDir: "./src/app",
    });
  },
};
