import { useWorkspace } from "@/composables";
import { Article } from "@/models/Article";
import { Accounts } from "@project-serum/anchor";

export async function deleteArticle(article: Article) {
  const {wallet, program} = useWorkspace();

  const accounts: Accounts = {
    article: article.publicKey,
    collector: wallet.value!.publicKey,
    systemProgram: program.value.programId,
  }

  try {
    await program.value.methods.deleteArticle().accounts(accounts).rpc();
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;

}