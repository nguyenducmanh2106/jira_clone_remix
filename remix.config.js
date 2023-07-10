/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    // unstable_dev: true,
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    // v2_routeConvention: true,
  },
  // routes(defineRoutes) {
  //   // uses the v1 convention, works in v1.15+ and v2
  //   return createRoutesFromFolders(defineRoutes);
  // },
  tailwind: true,
  serverModuleFormat: "cjs",
  ignoredRouteFiles: ["**/.*"],
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
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  // sourceMap: true,
  devServerPort: 8003,
};
