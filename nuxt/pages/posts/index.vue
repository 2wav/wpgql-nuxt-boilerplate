<template>
  <main class="post-directory">
    <post-directory :posts="posts" :type="'post'" />
    <page-controls
      :has-previous-page="hasPreviousPage"
      :has-next-page="hasNextPage"
      @clickedPrevious="loadPreviousPage"
      @clickedNext="loadNextPage"
    />
  </main>
</template>

<script>
import { get } from "lodash";

import GetPosts from "~/apollo/queries/getPosts";

import PostDirectory from "~/components/PostDirectory";
import PageControls from "~/components/PageControls";

export default {
  components: {
    PostDirectory,
    PageControls
  },
  data() {
    return {
      pageSize: 5,
      endCursor: null,
      startCursor: null
    };
  },
  apollo: {
    // If you want to use the page's data, you must write the Apollo object as a function
    posts() {
      const query = GetPosts;
      const variables = {
        first: this.pageSize,
        endCursor: this.endCursor
      };
      /**
       * Update should only be used to update the data
       * @param {Object[]} data Data returned from GQL
       * @returns {Object[]}
       */
      const update = function update(data) {
        const { edges } = data.posts;
        const posts = edges.map(edge => {
          return edge.node;
        });
        return posts;
      };
      /**
       * Use the result function to do anything other than update the data
       * Result is an object with one data property so we immediately destructure it
       * @param {Object} result
       */
      const result = function result({ data }) {
        const pageInfo = get(data, "posts.pageInfo");
        if (pageInfo) {
          const { startCursor, endCursor } = data.posts.pageInfo;
          this.startCursor = startCursor;
          this.endCursor = endCursor;
          if (this.$apollo.queries.hasPreviousPage) {
            this.$apollo.queries.hasPreviousPage.refetch({
              before: this.endCursor,
              last: this.pageSize
            });
          }
          if (this.$apollo.queries.hasNextPage) {
            this.$apollo.queries.hasNextPage.refetch({
              after: this.startCursor,
              first: this.pageSize
            });
          }
        }
      };
      return {
        query,
        variables,
        update,
        result
      };
    },
    hasNextPage() {
      const query = GetPosts;
      const variables = {
        first: this.pageSize,
        after: this.startCursor
      };
      const update = function update(data) {
        const pageInfo = get(data, "posts.pageInfo");
        if (pageInfo) {
          return get(pageInfo, "hasNextPage", false);
        }
      };
      return {
        query,
        variables,
        update
      };
    },
    hasPreviousPage() {
      const query = GetPosts;
      const variables = {
        last: this.pageSize,
        before: this.endCursor
      };
      const update = function update(data) {
        const pageInfo = get(data, "posts.pageInfo");
        if (pageInfo) {
          return get(pageInfo, "hasPreviousPage", false);
        }
      };
      return {
        query,
        variables,
        update
      };
    }
  },
  methods: {
    loadNextPage() {
      this.$apollo.queries.posts.setVariables({
        after: this.endCursor,
        first: this.pageSize
      });
    },
    loadPreviousPage() {
      this.$apollo.queries.posts.setVariables({
        before: this.startCursor,
        last: this.pageSize
      });
    }
  }
};
</script>
