<template>
  <section class="container">
    <div v-if="loading" class="row">
      Loading...
    </div>
    <div v-else class="row">
      <div v-for="article in sortedArticles" :key="article.publicKey.toBase58()">
        <ArticleCard :article="article" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Ref, ref, ComputedRef, computed} from "vue";
import {Article}  from "@/models/Article";
import { fetchArticles } from "@/api";
import ArticleCard from "./ArticleCard.vue";

const articles: Ref<Article[]> = ref([]);
const loading: Ref<boolean> = ref(true);

const sortedArticles: ComputedRef<Article[]> = computed(() => {
  return articles.value.slice(0).sort((a, b) => b.timestamp.millisecond() - a.timestamp.millisecond());
})

fetchArticles().then(fetchedArticles => articles.value = fetchedArticles).finally(() => loading.value = false)

</script>
