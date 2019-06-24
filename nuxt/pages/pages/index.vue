<template>
  <post-directory :query-type="'pages'" />
</template>

<script>
import PostDirectory from "~/components/PostDirectory";

export default {
  components: {
    PostDirectory
  }
};
</script>
