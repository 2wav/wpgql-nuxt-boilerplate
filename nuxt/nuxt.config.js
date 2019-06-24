/*
 ** Environment Variables
 */

const MY_NUXT_URL = "edit me!";
const MY_WP_URL = "edit me!";
const MY_GQL_URL = "Probably MY_WP_URL/graphql";

const NUXT_URL =
  process.env.NODE_ENV === "production" ? MY_NUXT_URL : "http://localhost:3000";
const WP_URL =
  process.env.NODE_ENV === "production" ? MY_WP_URL : "http://localhost:8080";
const WP_GQL_URL =
  process.env.NODE_ENV === "production"
    ? MY_GQL_URL
    : "http://localhost:8080/graphql";

/*
 ** Polyfills that we find to be frequently needed
 */
const features = ["fetch", "Object.assign", "Object.entries"].join("%2C");

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    script: [
      { src: `https://polyfill.io/v3/polyfill.min.js?features=${features}` }
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/_global.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/apollo",
    "@nuxtjs/eslint-module",
    "@nuxtjs/pwa",
    [
      "@nuxtjs/redirect-module",
      // eslint-disable-next-line prettier/prettier
      [{ from: "^/wp-admin", to: WP_URL }, { from: "^/login", to: "/admin" }]
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    browserBaseURL: NUXT_URL
  },
  /*
   ** Apollo Configuration
   */
  apollo: {
    tokenName: "apollo-token", // default value
    tokenExpires: 10, // default 7 days
    includeNodeModules: true, // this includes graphql-tag for node_modules
    authenticationType: "Basic", // default 'Bearer'
    // optional
    // errorHandler(error) {
    //   console.log("Global error handler");
    //   console.error(error.message);
    //   console.error(error.graphQLErrors);
    //   console.error(error.networkError);
    //   console.error(error.gqlError);
    // },
    errorHandler: "~/plugins/apollo-error-handler.js",
    // required
    clientConfigs: {
      default: "~/apollo/client-configs/default.js"
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Add sourcemaps
      if (ctx.isClient) {
        config.devtool = "#source-map";
      } else if (ctx.isDev) {
        config.devtool = "inline-source-map";
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
