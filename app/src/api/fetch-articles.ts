import { useWorkspace } from "@/composables";
import { Article } from "@/models/Article";
import { GetProgramAccountsFilter } from "@solana/web3.js";

export async function fetchArticles(filters: GetProgramAccountsFilter[]) {
  const { program } = useWorkspace();
  const articles = await program.value.account.article.all(filters);
  return articles.map(article => new Article(article.publicKey, article.account))
}