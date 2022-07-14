import { useWorkspace } from "@/composables";
import { Article } from "@/models/Article";
import { web3 } from "@project-serum/anchor";

export async function addArticle(title: string, link: string) {
  const {wallet, program} = useWorkspace();

  const article = web3.Keypair.generate();

  await program.value.methods.addArticle(title, link).accounts({
    collector: wallet.value?.publicKey,
    article: article.publicKey,
    systemProgram: web3.SystemProgram.programId,
  }).signers([article]).rpc();

  const articleAccount = await program.value.account.article.fetch(article.publicKey);

  return new Article(article.publicKey, articleAccount);
}