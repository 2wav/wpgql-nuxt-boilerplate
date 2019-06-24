<template>
  <div class="default-layout">
    <site-nav />
    <nuxt />
  </div>
</template>

<script>
import SiteNav from "~/components/SiteNav";
export default {
  components: {
    SiteNav
  }
};
</script>

<style>
.default-layout {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 960px;
  padding: 0 1rem;
}
</style>
