<template>
  <div v-if="wallet">
    <AddArticleForm />
    <ArticleGrid />
  </div>
  <div v-else class="position-absolute top-50 start-50 translate-middle">
    Connect your wallet to view and add to reading list!
  </div>
</template>

<script setup lang="ts">
import ArticleGrid from "@/components/ArticleGrid.vue";
import AddArticleForm from "@/components/AddArticleForm.vue";

import { useWorkspace } from "@/composables";

const {wallet} = useWorkspace();
</script>
