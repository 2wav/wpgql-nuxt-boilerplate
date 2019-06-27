<template>
  <main class="post-directory">
    <post-list :posts="posts" :post-type="queryType" />
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
import GetPages from "~/apollo/queries/getPages";

import PostList from "~/components/PostList";
import PageControls from "~/components/PageControls";

export default {
  components: {
    PostList,
    PageControls
  },
  props: {
    queryType: {
      type: String,
      default: "posts"
    }
  },
  data() {
    return {
      pageSize: 5,
      endCursor: null,
      startCursor: null
    };
  },
  apollo: {
    /**
     * If you want to use the page's data in the query (say, as variables), you must write the Apollo object as a function
     * @returns {SmartQuery} an apollo object
     */
    posts() {
      const queryType = this.$props.queryType;
      const query = queryType === "posts" ? GetPosts : GetPages;
      const variables = {
        first: this.pageSize
      };
      /**
       * Update should only be used to update the data
       * @param {Object[]} data Data returned from GQL
       * @returns {Object[]}
       */
      const update = function update(data) {
        const { edges } = data[queryType];
        const posts = edges.map(edge => {
          return edge.node;
        });
        return posts;
      };
      /**
       * Use the result function to do anything other than update the data
       * Result is an object with one data property so we immediately destructure it
       * This function refetches the hasNextPage and hasPreviousPage queries after we get new search results
       * @param {Object} result
       */
      const result = function result({ data }) {
        const pageInfo = get(data, `${queryType}.pageInfo`);
        if (pageInfo) {
          const { startCursor, endCursor } = pageInfo;
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
    /**
     * Determine if there's a next page of results.
     * Takes the current page of results and checks if pageInfo.hasNextPage is true.
     * @returns {SmartQuery}
     */
    hasNextPage() {
      const queryType = this.$props.queryType;
      const query = queryType === "posts" ? GetPosts : GetPages;
      const variables = {
        first: this.pageSize,
        after: this.startCursor
      };
      /**
       * Set the hasNextPage property
       * @param {Object} data the result of the gql query
       * @returns {Boolean}
       */
      const update = function update(data) {
        const pageInfo = get(data, `${queryType}.pageInfo`);
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
    /**
     * Determine if there's a previous page of results.
     * Runs the reverse of the current page query (starts at the end and counts backwards) and checks if hasPreviousPage is true.
     * @returns {SmartQuery}
     */
    hasPreviousPage() {
      const queryType = this.$props.queryType;
      const query = queryType === "posts" ? GetPosts : GetPages;
      const variables = {
        last: this.pageSize,
        before: this.endCursor
      };
      /**
       * Set the hasPreviousPage property
       * @param {Object} data the result of the gql query
       * @returns {Boolean}
       */
      const update = function update(data) {
        const pageInfo = get(data, `${queryType}.pageInfo`);
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
    /**
     * Get more results by refetching the page query, starting at the endCursor and going forward.
     */
    loadNextPage() {
      this.$apollo.queries.posts.refetch({
        after: this.endCursor,
        before: null,
        first: this.pageSize,
        last: null
      });
    },
    /**
     * Get the previous page of results by starting at the start cursor and getting a before list.
     */
    loadPreviousPage() {
      this.$apollo.queries.posts.refetch({
        after: null,
        before: this.startCursor,
        first: null,
        last: this.pageSize
      });
    }
  }
};
</script>
