<script lang="ts">
import { Article } from "@/models/Article";
import { defineComponent } from "vue";
import LinkPreview from "./LinkPreview.vue";

export default defineComponent({
  name: "ArticleCard",
  props: {
    article: {
      type: Article,
      required: true
    }
  },
  components: {
    LinkPreview,
  }

});
</script>

<template>
  <div class="card">
    <LinkPreview :link="article.link" />
    <div class="card-body">
      <a :href="article.link">Go to page</a>
    </div>
  </div>
</template>