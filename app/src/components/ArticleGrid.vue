<template>
  <section class="container">
    <div v-if="loading">Loading articles...</div>
    <div v-else class="row">
      <div v-for="article in sortedArticles" :key="article.publicKey.toBase58()" class="col-md-4">
        <ArticleCard :article="article" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ComputedRef, computed, ref} from "vue";
import { useStore } from "vuex";
import {Article}  from "@/models/Article";
import ArticleCard from "./ArticleCard.vue";

const store = useStore();

const loading = ref(true);

store.dispatch('loadArticles').finally(() => loading.value = false);

const sortedArticles: ComputedRef<Article[]> = computed(() => {
  const articles: Article[] = store.getters.getArticles;
  console.log(articles);

  return articles.slice(0).sort((a, b) => b.timestamp.millisecond() - a.timestamp.millisecond());
})

</script>
