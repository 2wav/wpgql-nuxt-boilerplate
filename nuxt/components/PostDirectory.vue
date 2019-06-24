<template>
  <ul class="post-directory__list">
    <li v-for="post in posts" :key="post.uri" class="post-directory__item">
      <a
        :href="`${postType}s/${post.uri}`"
        class="post-directory__link"
        v-html="post.title"
      />
      <div
        class="post-directory__post-excerpt"
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
    // Wordpress will send you an excerpt with [...] at the end
    // We want that to look better!
    /**
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
.post-directory {
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__item {
    margin-bottom: 1rem;
  }
}
</style>
