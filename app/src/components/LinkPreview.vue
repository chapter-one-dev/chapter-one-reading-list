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
  computed: {
    altImage() {
      if (this.response && !this.response.image) {
        if (this.link.includes("https://twitter.com")) {
          return "twitter";
        } else {
          return "";
        }
      } else {
        return undefined;
      }
    },
    altTitle() {
      if (this.response && !this.response.image) {
        if (this.link.includes("https://twitter.com")) {
          return "twitter";
        } else {
          return "";
        }
      } else {
        return undefined;
      }
    }
  },
  methods: {
    getTwitterHandle(twitterUrl: string): string {
      const removedDomain = twitterUrl.slice("https://twitter.com/".length);
      

      const splitOnSlash = removedDomain.split("/");

      return splitOnSlash[0];

    },
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
    <img v-if="response.image" class="card-img-top" :src="response.image" :alt="response.title" />
    <img v-else-if="altImage == 'twitter'" class="card-img-top" src="@/assets/twitter-logo.png" alt="Twitter Article" />
    <div class="card-body">
      <h1 class="card-title" v-if="response.title">{{ response.title }}</h1>
      <h1 class="card-title" v-else-if="altTitle === 'twitter'">Thread by @{{getTwitterHandle(link)}}</h1>
      <h1 class="card-title" v-else>{{link}}</h1>
      <p class="card-text" v-if="response.description">{{ response.description }}</p>
    </div>
  </div>
  <div v-else>Loading Preview</div>
</template>
