<template>
  <nav class="site-nav">
    <a
      v-for="item in siteNav"
      :key="item.id"
      class="site-nav__item site-nav__button site-nav__button--green"
      :class="{ 'site-nav__button--active': activeItem(item.label) }"
      :href="item.url"
      v-html="item.label"
    />
  </nav>
</template>

<script>
/**
 * @namespace SiteNav
 */
import { get } from "lodash";

import GetMenuBySlug from "~/apollo/queries/getMenuBySlug";

export default {
  /**
   * This is an example of a SmartQuery object directly on the template, rather than created through a function.
   * @name siteNav
   * @memberof SiteNav
   * @type {SmartQuery}
   */
  apollo: {
    siteNav: {
      query: GetMenuBySlug,
      variables: {
        slug: "site-nav"
      },
      /**
       * Return the menu items
       * @name siteNavUpdate
       * @memberof SiteNav
       * @param {Object} data The data returned by the SmartQuery.
       * @returns {Object[]} A list of menu items.
       */
      update: function update(data) {
        return data.menus.nodes[0].menuItems.nodes;
      }
    }
  },
  methods: {
    /**
     * Determine if the menu item is the active page
     * @name activeItem
     * @memberof SiteNav
     * @param {String} label The menu item's label.
     * @returns {Boolean}
     */
    activeItem(label) {
      const path = get(this.$route, "path");
      const lowerCaseLabel = label.toLowerCase();
      if (path) {
        if (lowerCaseLabel !== "home") {
          return `/${lowerCaseLabel}` === path;
        } else {
          return path === "/";
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
.site-nav {
  padding: 0.5rem 0;
  width: 100%;
  &__button {
    color: get-color("green");
    @include button;
  }
}
</style>
