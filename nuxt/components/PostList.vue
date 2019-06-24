<template>
  <ul class="post-list__list">
    <li v-for="post in posts" :key="post.uri" class="post-list__item">
      <a :href="postLink(post)" class="post-list__link" v-html="post.title" />
      <div
        class="post-list__post-excerpt"
        v-html="makeBetterExcerptLink(post)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default() {
        return [];
      }
    },
    postType: {
      type: String,
      default() {
        return "post";
      }
    }
  },
  methods: {
    /**
     * Posts live at /post and pages at /, so we need to give a different uri, depending
     */
    postLink(post) {
      return this.$props.postType === "pages"
        ? `/${post.uri}`
        : `/posts/${post.uri}`;
    },
    /**
     * Wordpress will send you an excerpt with [...] at the end
     * We want that to look better!
     * @param {Object} page The page object we retrieved with GQL
     * @returns {String} The excerpt, but with a better link
     */
    makeBetterExcerptLink(page) {
      const { uri, excerpt } = page;
      if (uri && excerpt) {
        return excerpt.replace("[&hellip;]", `[<a href="${uri}">&hellip;</a>]`);
      }
    }
  }
};
</script>

<style lang="scss">
.post-list {
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__link {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  &__item {
    margin-bottom: 1rem;
  }
}
</style>
