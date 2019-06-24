<template>
  <main class="pages-directory">
    <post-directory :posts="pages" :type="'page'" />
  </main>
</template>

<script>
import { get } from "lodash";

import GetPages from "~/apollo/queries/getPages";

import PostDirectory from "~/components/PostDirectory";

export default {
  components: {
    PostDirectory
  },
  data() {
    return {
      pageSize: 5,
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false
    };
  },
  apollo: {
    // If you want to use the page's data, you must write the Apollo object as a function
    /**
     * Get all pages that we want to display
     * @returns {Object[]} The GraphQL object
     */
    pages() {
      const query = GetPages;
      const variables = {
        first: this.pageSize,
        endCursor: this.endCursor
      };
      /**
       * Update should only be used to update the data
       * @param {Object[]} data Data returned from GQL
       * @returns {Object[]} the pages that fit the query
       */
      const update = function update(data) {
        const { edges } = data.pages;
        const pages = edges.map(edge => {
          return edge.node;
        });
        return pages;
      };
      /**
       * Result is an object with one data property so we immediately destructure it
       * Use the result function to do anything other than update the data
       * @param {Object} result
       */
      const result = function result({ data }) {
        const pageInfo = get(data, "pages.pageInfo");
        if (pageInfo) {
          const {
            endCursor,
            hasNextPage,
            hasPreviousPage
          } = data.pages.pageInfo;
          this.endCursor = endCursor;
          this.hasPreviousPage = hasPreviousPage;
          this.hasNextPage = hasNextPage;
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
      const query = GetPages;
      const variables = {
        first: this.pageSize,
        after: this.endCursor
      };
      /**
       * Update should only be used to update the data
       * @param {Object[]} data Data returned from GQL
       * @returns {Object[]} the pages that fit the query
       */
      const update = function update(data) {
        const { edges } = data.pages;
        const pages = edges.map(edge => {
          return edge.node;
        });
        return pages;
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
