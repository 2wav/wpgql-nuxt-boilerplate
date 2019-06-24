<template>
  <post-directory :query-type="'posts'" />
</template>

<script>
import PostDirectory from "~/components/PostDirectory";

export default {
  components: {
    PostDirectory
  }
};
</script>
