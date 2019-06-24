# wpgql-nuxt-boilerplate
A boilerplate setup of Nuxt with content from headless Wordpress using the Wordpress GraphQL plugin.

## Components
Content Rendering: [Nuxt.js](https://nuxtjs.org/) (Server-side Vue.js)
Content Management: [Wordpress](https://wordpress.com/)
Content Retrieval: [WPGraphQL](https://github.com/wp-graphql/wp-graphql) GraphQL for Wordpress

## Installation Instructions
1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop).
1. Clone the repository: `git clone https://github.com/2wav/wpgql-nuxt-boilerplate.git`.
1. Change to wp directory: `cd wpgql-nuxt-boilerplate/wp`.
1. Start the Docker container `dc up`.
1. Open a web browser and visit localhost:8080.
1. Follow the Wordpress installation instructions.
1. Go to the plugins page.
1. Activate all plugins.
1. Go to Wordpress Settings->Permalinks and set to anything but the default.
1. Open a new terminal session **(leave your Docker session running)**.
1. `cd` into the `/nuxt` directory (if you didn't change directories, `cd ../nuxt`).
1. Install node modules `npm i`.
1. Start the application `npm run dev`.

## Additional NPM packages for Nuxt
* [@nuxtjs/apollo](https://www.npmjs.com/package/@nuxtjs/apollo): Apollo inside Nuxt.
* [nuxt-vuex-router-sync](https://www.npmjs.com/package/nuxt-vuex-router-sync): Keep the current route in the Vuex store.
* [@nuxtjs/style-resources](https://www.npmjs.com/package/@nuxtjs/style-resources): Share style resources across components (the `styleResources` block in `nuxt.config.js`).
* [@nuxtjs/redirect-module](https://www.npmjs.com/package/@nuxtjs/redirect-module): Easy redirects in Nuxt. Used to make `/wp-admin` link to the wordpress app.
* [webpack](https://www.npmjs.com/package/webpack), [node-sass](https://github.com/sass/node-sass), and [sass-loader](https://www.npmjs.com/package/sass-loader): Compile SCSS into CSS .
* [lodash](https://lodash.com/): Trying to get undefined properties in your queries will tank your whole site, so you'll be using [`_.get()`](https://lodash.com/docs/4.17.11#get) a lot.

## Wordpress Plugins
1. [WPGraphQL](https://github.com/wp-graphql/wp-graphql): Allow GraphQL queries against the Wordpress database.
1. [WP Headless](https://wordpress.org/plugins/wp-headless/): Disable the WP frontend

## Notes
* We've left the prettier and eslint configurations almost entirely untouched, but with some exceptions.
    * We use double quotes in house.
    * We also use semicolons.
    * We've disabled no-html because that's how we import content from Wordpress.
    * We've disabled no-console because you are going to be using it a *lot* while you're debugging server-side stuff.
* We've imported a few polyfills (fetch, object.assign, and object.entries) from [polyfill.io](https://polyfill.io/) that we frequently need.
* You often need to restart Nuxt after editing nuxt.config.js—do so by typing rs into the terminal session that's running the app.
* You also often need to restart Nuxt from the console if it's crashing on a GraphQL query.
* There are multiple ways to create an apollo object. We've included examples of writing as an object with properies (/pages/_.vue) and writing as a function that returns an object (SiteNav.vue).