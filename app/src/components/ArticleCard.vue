<script lang="ts">
import { Article } from "@/models/Article";
import { defineComponent } from "vue";

interface LinkPreviewResponse {
  title: string;
  description: string;
  image: string;
}

export default defineComponent({
  name: "ArticleCard",
  props: {
    article: {
      type: Article,
      required: true,
    },
    apiURL: {
      type: String,
      // TODO: replace this with own preview server
      default: "https://link-prevue-api-v2.herokuapp.com/preview/",
    },
  },
  watch: {
    url: function () {
      this.response = null;
      this.getLinkPreview();
    },
  },
  created() {
    this.getLinkPreview();
  },
  data() {
    return {
      response: null as LinkPreviewResponse | null,
      validURL: false,
    };
  },
  methods: {
    isValidURL(url: string): boolean {
      const regex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      this.validURL = regex.test(url);
      return this.validURL;
    },
    getLinkPreview() {
      if (this.isValidURL(this.article.link)) {
        this.httpRequest(
          (response: string) => {
            this.response = JSON.parse(response);
          },
          () => {
            this.response = null;
            this.validURL = false;
          }
        );
      }
    },
    httpRequest(success: CallableFunction, error: CallableFunction) {
      const http = new XMLHttpRequest();
      const params = "url=" + this.article.link;
      http.open("POST", this.apiURL, true);
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
          success(http.responseText);
        }
        if (http.readyState === 4 && http.status === 500) {
          error();
        }
      };
      http.send(params);
    },
  },
});
</script>

<template>
  <div class="card" v-if="response && validURL">
    <img class="card-img-top" :src="response.image" alt="Response Image" />
    <div class="card-body">
      <div class="card-title">
        <h1>{{ response.title || article.title }}</h1>
      </div>
      <div class="card-test">
        <p>{{ article.created_ago }}</p>
        <p>{{ article.added_date }}</p>
        <p>{{ response.description }}</p>
      </div>
    </div>
  </div>
</template>
