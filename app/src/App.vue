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
          <div class="d-none d-md-flex"><WalletMultiButton /></div>
        </div>
      </div>
    </nav>
    <div class="d-md-none"><WalletMultiButton /></div>
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

<script setup lang="ts">
import dayjs from "dayjs";
import { WalletMultiButton, initWallet } from "solana-wallets-vue";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { initWorkspace } from "@/composables";
import { ref } from "vue";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

initWallet({ wallets, autoConnect: true });
initWorkspace();

const currentYear = dayjs().year();

</script>
