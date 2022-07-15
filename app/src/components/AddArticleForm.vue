<template>
<div class="container">
  <form class="col m-5">
    <div class="input-group flex-nowrap">
      <label for="link" class="input-group-text">Link</label>
      <input id="link" class="form-control" placeholder="https://mirror.xyz/" v-model="link" />
    </div>
    <div class="row">
      <button class="btn btn-primary col m-2" @click.prevent="add">Add Article</button>
      <button v-if="!showPreview" class="btn btn-secondary col m-2" @click.prevent="togglePreview" :disabled="!validLink">Show Preview</button>
      <button v-else class="btn btn-secondary col m-2" @click.prevent="togglePreview">Hide Preview</button>
    </div>
  </form>
  <aside v-if="showPreview" class="col-4">
    <LinkPreview :link="link" />
  </aside>
</div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import { addArticle } from '@/api/add-article';
import LinkPreview from './LinkPreview.vue';
import { isValidURL } from "@/composables";

const link = ref("");
const showPreview = ref(false);
const validLink = computed(() => {
  return isValidURL(link.value);
});

async function add() {
  const article = await addArticle(link.value);
  link.value = "";
  console.log(article);
}

function togglePreview() {
  showPreview.value = !showPreview.value;
}

</script>