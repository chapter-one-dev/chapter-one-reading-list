<template>
  <form>
    <div class="input-group flex-nowrap">
      <label for="title" class="input-group-text">Article Title</label>
      <input id="title" class="form-control" placeholder="MEV" v-model="title"/>
    </div>
    <div class="input-group flex-nowrap">
      <label for="link" class="input-group-text">Link</label>
      <input id="link" class="form-control" placeholder="https://twitter.com/yb_effect/status/1521609803600044032" v-model="link" />
    </div>
    <button class="btn btn-secondary" @click.prevent="add">Add Article</button>
  </form>
  <!-- TODO: add preview article button-->
</template>

<script setup lang="ts">
import {ref} from "vue";
import { addArticle } from '@/api/add-article';

const title = ref("");
const link = ref("");

async function add() {
  const article = await addArticle(title.value, link.value);
  title.value = "";
  link.value = "";
  console.log(article);
}

</script>