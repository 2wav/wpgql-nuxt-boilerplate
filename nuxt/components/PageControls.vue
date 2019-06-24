<template>
  <section class="page-controls">
    <button
      class="page-controls__button page-controls__button--previous button--green"
      @click="clickedPrevious"
    >
      Previous Page
    </button>
    <button
      class="page-controls__button page-controls__button--next button--green"
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
