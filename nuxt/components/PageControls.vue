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
    clickedPrevious() {
      this.$emit("clickedPrevious");
    },
    clickedNext() {
      this.$emit("clickedNext");
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
