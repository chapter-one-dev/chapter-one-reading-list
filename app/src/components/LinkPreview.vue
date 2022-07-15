<script lang="ts">
import { isValidURL } from "@/composables";
import { defineComponent } from "vue";

interface LinkPreviewResponse {
  title: string;
  description: string;
  image: string;
}

export default defineComponent({
  name: "ArticleCard",
  props: {
    apiURL: {
      type: String,
      // TODO: replace this with own preview server
      default: "https://link-prevue-api-v2.herokuapp.com/preview/",
    },
    link: {
      type: String,
      required: true,
    }
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
    checkValidURL(url: string): boolean {
      this.validURL = isValidURL(url);
      return this.validURL;
    },
    getLinkPreview() {
      if (this.checkValidURL(this.link)) {
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
      const params = "url=" + this.link;
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
  <div class="card-body" v-if="response && validURL">
    <img class="card-img-top" :src="response.image" :alt="response.title" />
    <div class="card-body">
      <h1 class="card-title">{{ response.title }}</h1>
      <p class="card-text">{{ response.description }}</p>
    </div>
  </div>
</template>
