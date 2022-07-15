<script lang="ts">
import { Article } from "@/models/Article";
import { defineComponent } from "vue";
import LinkPreview from "./LinkPreview.vue";
import { deleteArticle } from "@/api/delete-article";
import { mapMutations } from "vuex";

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
  },
  methods: {
    async deleteThisArticle() {
      const deleted = await deleteArticle(this.article);
      this.remove(this.article);
      return deleted;
    },
    ...mapMutations({remove: 'deleteArticle'})
  }

});
</script>
<script setup lang="ts">
import { useWorkspace } from "@/composables";

const {wallet} = useWorkspace();
</script>

<template>
  <div class="card">
    <LinkPreview :link="article.link" />
    <div class="card-body">
      <a :href="article.link" class="btn btn-secondary" target="_blank">Go to article!</a>
      <p>Added {{article.created_ago}} by 
        <a :href="`https://explorer.solana.com/address/${article.collector.toString()}?cluster=devnet`">
        {{article.collector_display}}
        </a>
      </p>
      <button v-if="wallet && wallet.publicKey && wallet.publicKey.toBase58() == article.collector.toBase58()"
        @click="deleteThisArticle"
        class="btn btn-danger">
        Delete Article
      </button>
    </div>
  </div>
</template>