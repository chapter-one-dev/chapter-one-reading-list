<template>
  <div class="container-fluid">
    <h1>Home</h1>
    <WalletMultiButton />
    <div v-if="workspace.wallet.value">
      <AddArticleForm />
      <ArticleGrid />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { WalletMultiButton, initWallet } from "solana-wallets-vue";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { initWorkspace, useWorkspace, Workspace } from "@/composables";
import ArticleGrid from "@/components/ArticleGrid.vue";
import AddArticleForm from "@/components/AddArticleForm.vue";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

initWallet({ wallets, autoConnect: true });
initWorkspace();
const workspace: Workspace = useWorkspace();
</script>
