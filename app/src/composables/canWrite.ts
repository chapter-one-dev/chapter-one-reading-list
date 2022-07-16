import { AnchorWallet } from "solana-wallets-vue";

const CHAPTER_ONE_WALLETS: string[] = [
  "5bobMwjqaaydwBa3xSKLqLJjpZhJk11H3c8GtTcnsFca", // Jared
  "BekMq8zX8meDMUzFViGU6PWhoDmVZfgbkiJQYirfrL55", // Jamesin
]

export function canWrite(wallet: AnchorWallet): boolean {
  return CHAPTER_ONE_WALLETS.includes(wallet.publicKey.toString());
}