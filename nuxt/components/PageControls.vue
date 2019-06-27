<template>
  <section class="page-controls">
    <button
      class="page-controls__button page-controls__button--previous"
      :class="{ 'page-controls__button--disabled': !hasPreviousPage }"
      @click="clickedPrevious"
    >
      Previous Page
    </button>
    <button
      class="page-controls__button page-controls__button--next"
      :class="{ 'page-controls__button--disabled': !hasNextPage }"
      @click="clickedNext"
    >
      Next Page
    </button>
  </section>
</template>

<script>
/**
 * Control buttons for pagination.
 * @namespace PageControls
 */
export default {
  props: {
    hasPreviousPage: {
      type: Boolean,
      default() {
        return false;
      }
    },
    hasNextPage: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    /**
     * Emit an event to the parent, which in this case will load the next page of results.
     * @name clickedNext
     * @memberof PageControls
     */
    clickedNext() {
      this.$emit("clickedNext");
    },
    /**
     * Emit an event to the parent, which in this case will load the previous page of results.
     * @name clickedPrevious
     * @memberof PageControls
     */
    clickedPrevious() {
      this.$emit("clickedPrevious");
    }
  }
};
</script>

<style lang="scss">
.page-controls {
  &__button {
    @include button;
  }
}
</style>
