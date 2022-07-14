<template>
  <div class="container-fluid">
    <h1>Home</h1>
    <WalletMultiButton />
  </div>
</template>

<script setup lang="ts">
import { WalletMultiButton, initWallet } from "solana-wallets-vue";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

initWallet({ wallets, autoConnect: true });
</script>
