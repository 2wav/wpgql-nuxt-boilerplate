<template>
  <main class="page">
    <h2 class="page__title" v-html="page.title" />
    <div class="page__content" v-html="page.content" />
  </main>
</template>

<script>
import GetPageBySlug from "~/apollo/queries/getPageBySlug";

export default {
  apollo: {
    page() {
      const query = GetPageBySlug;
      const variables = {
        uri: this.$route.params.pathMatch
      };
      const update = function update(data) {
        // This is an extremely useful logging statement that you'll use a lot.
        console.log(JSON.stringify(data, null, 2));
        return data.pageBy;
      };
      return {
        query,
        variables,
        update
      };
    }
  }
};
</script>

<style lang="scss">
.page {
  &__title {
    margin-bottom: 1rem;
  }
  &__content {
    // This is where you will need to style your content
    // Note that the markup is stored in Wordpress itself
    p {
      margin-bottom: 0.75rem;
    }
    blockquote {
      font-style: italic;
      margin: 0 1rem 0.75rem;
    }
  }
}
</style>
