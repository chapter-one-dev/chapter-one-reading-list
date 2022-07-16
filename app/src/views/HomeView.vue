<template>
  <div v-if="wallet">
    <AddArticleForm v-if="hasPermission"/>
    <ArticleGrid />
  </div>
  <div v-else class="position-absolute top-50 start-50 translate-middle">
    Connect your wallet to view and add to reading list!
  </div>
</template>

<script setup lang="ts">
import ArticleGrid from "@/components/ArticleGrid.vue";
import AddArticleForm from "@/components/AddArticleForm.vue";

import { useWorkspace, canWrite } from "@/composables";
import { computed } from "vue";

const { wallet } = useWorkspace();

const hasPermission = computed(() => {
  return (wallet && wallet.value) ? canWrite(wallet.value) : false;
});
</script>
