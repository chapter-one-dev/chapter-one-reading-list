<template>
  <header>
    <nav class="navbar navbar-expand-md bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Chapter One Reading List</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#menu" aria-controls="menu" aria-expanded="false" 
          aria-label="Toggle navigation"> 
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse justify-content-md-between" id="menu">
          <div class="navbar-nav d-flex">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
          </div>
          <div class="d-none d-md-flex">
            <span class="position-absolute z-100 top-0 bg-danger rounded-circle px-2 wallet-alert" 
              :class="{'invisible': hasPermission}"
              data-bs-toggle="tooltip" data-bs-placement="left" title="You can't add articles to the reading list">
              <i class="fa-regular fa-exclamation"></i>
            </span>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </nav>
    <div class="d-md-none">
      <span class="position-absolute bg-danger rounded-circle px-2 wallet-alert"
        :class="{'invisible': hasPermission}"
        style="top: 3rem; left: 8.5rem;"
        data-bs-toggle="tooltip" data-bs-placement="right" title="You can't add articles to the reading list">
        <i class="fa-regular fa-exclamation"></i>
      </span>
      <WalletMultiButton />
    </div>
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
  <footer class="position-fixed bottom-0 bg-light container-fluid d-flex justify-content-between">
    <p class="p-0 m-0 pt-2">&copy; {{currentYear}} <a href="https://chapterone.com/">chapterone.com</a></p>
    <nav class="nav">
      <a href="https://github.com/chapter-one-dev/chapter-one-reading-list" class="nav-link"><i class="fa-brands fa-github"></i></a>
      <a href="https://twitter.com/chapterone" class="nav-link"><i class="fa-brands fa-twitter"></i></a>
    </nav>
  </footer>
</template>

<style>
.wallet-alert {
  z-index: 1000;
}
</style>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import dayjs from "dayjs";
import {Tooltip} from "bootstrap";
import { WalletMultiButton, initWallet } from "solana-wallets-vue";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { initWorkspace, useWorkspace, canWrite } from "@/composables";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
initWallet({ wallets, autoConnect: true });
initWorkspace();
const { wallet } = useWorkspace();
const hasPermission = computed(() => {
  return (wallet && wallet.value) ? canWrite(wallet.value) : false;
});

const currentYear = dayjs().year();

onMounted(() => {
  if (!hasPermission.value) {
    const triggerList = document.querySelectorAll(".wallet-alert");
    console.log(triggerList);
    const tooltipList = [...triggerList].map(trigger => Tooltip.getOrCreateInstance(trigger));
  }
});





</script>
