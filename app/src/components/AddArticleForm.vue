<template>
  <form>
    <div class="input-group flex-nowrap">
      <label for="link" class="input-group-text">Link</label>
      <input id="link" class="form-control" placeholder="https://twitter.com/yb_effect/status/1521609803600044032" v-model="link" />
    </div>
    <button class="btn btn-primary" @click.prevent="add">Add Article</button>
    <button v-if="!showPreview" class="btn btn-secondary" @click.prevent="togglePreview" :disabled="!validLink">Show Preview</button>
    <button v-else class="btn btn-secondary" @click.prevent="togglePreview">Hide Preview</button>
  </form>
  <aside v-if="showPreview">
    <LinkPreview :link="link" />
  </aside>
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