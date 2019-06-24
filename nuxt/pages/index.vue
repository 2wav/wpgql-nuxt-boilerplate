<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        wpgql-boilerplate
      </h1>
      <h2 class="subtitle">
        A boilerplate Nuxt app that gets data from Wordpress through GraphQL
      </h2>
      <site-nav />
      <div class="links">
        <a
          href="https://github.com/2wav/wpgql-nuxt-boilerplate"
          target="_blank"
          class="button button--blue"
          >Boilerplate Documentation</a
        >
        <a
          href="https://docs.wpgraphql.com"
          target="_blank"
          class="button button--blue"
          >WPGraphQL Documentation</a
        >
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button button--green"
          >Nuxt Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button button--blue"
          >Nuxt GitHub</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo";
import SiteNav from "~/components/SiteNav";

export default {
  components: {
    Logo,
    SiteNav
  },
  layout: "frontPage"
};
</script>

<style lang="scss">
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: get-color("blue");
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.button {
  @include button;
  &--blue {
    @include button("blue");
  }
}
</style>
