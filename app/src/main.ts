import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "solana-wallets-vue/styles.css";
import "./main.scss";
import "bootstrap";

createApp(App).use(store).use(router).mount("#app");
