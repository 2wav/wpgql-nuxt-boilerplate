<template>
  <nav class="site-nav">
    <a
      v-for="item in siteNav"
      :key="item.id"
      class="site-nav__item button--green"
      :href="item.url"
      v-html="item.label"
    />
  </nav>
</template>

<script>
import GetMenuBySlug from "~/apollo/queries/getMenuBySlug";
export default {
  apollo: {
    siteNav: {
      query: GetMenuBySlug,
      variables: {
        slug: "site-nav"
      },
      update(data) {
        return data.menus.nodes[0].menuItems.nodes;
      }
    }
  }
};
</script>

<style lang="scss">
.site-nav {
  padding: 0.5rem 0;
  width: 100%;
  &__item {
    & + & {
      margin-left: 1rem;
    }
  }
}
</style>
