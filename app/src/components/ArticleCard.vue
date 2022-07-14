<script lang="ts">
import { defineComponent } from "vue";

interface LinkPreviewResponse {
  title: string;
  description: string;
  image: string;
}

export default defineComponent({
  name: "ArticleCard",
  props: {
    link: { type: String, required: true },
    apiURL: {
      type: String,
      // TODO: replace this with own preview server
      default: "https://link-prevue-api-v2.herokuapp.com/preview/",
    },
    collector: {
      type: String,
      required: true,
    },
    title: {
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
    isValidURL(url: string): boolean {
      const regex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      this.validURL = regex.test(url);
      return this.validURL;
    },
    getLinkPreview() {
      if (this.isValidURL(this.link)) {
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
  <div class="card" v-if="response && validURL">
    <img class="card-img-top" :src="response.image" alt="Response Image" />
    <div class="card-body">
      <div class="card-title">
        <h1>{{ response.title }}</h1>
      </div>
      <div class="card-test">
        <p>{{ response.description }}</p>
      </div>
    </div>
  </div>
</template>
