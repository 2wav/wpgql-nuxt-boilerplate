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
1. Go to the plugins page
1. Activate all plugins
1. Open a new terminal session **(leave your Docker session running)**.
1. `cd` into the `/nuxt` directory (if you didn't change directories, `cd ../nuxt`).
1. Install node modules `npm i`.
1. Start the application `npm run dev`.

## Additional NPM packages for Nuxt
* [@nuxtjs/apollo](https://www.npmjs.com/package/@nuxtjs/apollo): Apollo inside Nuxt.
* [nuxt-vuex-router-sync](https://www.npmjs.com/package/nuxt-vuex-router-sync): Keep the current route in the Vuex store.
* [@nuxtjs/style-resources](https://www.npmjs.com/package/@nuxtjs/style-resources): Share style resources across components (the `styleResources` block in `nuxt.config.js`).
* [@nuxtjs/redirect-module](https://www.npmjs.com/package/@nuxtjs/redirect-module): Easy redirects in Nuxt. Used to make `/wp-admin` link to the wordpress app.

## Notes
* We've left the prettier and eslint configurations almost entirely untouched except for switching to double quotes because that's what we use in-house.
* We've imported a few polyfills (fetch, object.assign, and object.entries) from [polyfill.io](https://polyfill.io/) that we frequently need.