<template>
  <section class="container">
    <div v-if="loading" class="row">
      Loading...
    </div>
    <div v-else class="row">
      <div v-for="article in articles" :key="article.publicKey.toBase58()">
        <ArticleCard :link="article.link" :title="article.title" :collector="article.collector_display" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {Article}  from "@/models/Article";
import { fetchArticles } from "@/api";
import ArticleCard from "./ArticleCard.vue";

const articles: Ref<Article[]> = ref([]);
const loading: Ref<boolean> = ref(true);

fetchArticles().then(fetchedArticles => articles.value = fetchedArticles).finally(() => loading.value = false)

</script>
