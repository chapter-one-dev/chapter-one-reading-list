import * as anchor from "@project-serum/anchor";
import { Program, Accounts, web3 } from "@project-serum/anchor";
import { ChapterOneReadingList } from "../target/types/chapter_one_reading_list";
import * as assert from "assert";

describe("chapter-one-reading-list", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ChapterOneReadingList as Program<ChapterOneReadingList>;

  it("can add an article", async () => {
    const article: web3.Keypair = web3.Keypair.generate();

    const accounts: Accounts = {
      article: article.publicKey,
      collector: program.provider.publicKey,
      systemProgram: web3.SystemProgram.programId,
    }

    await program.methods.addArticle('Article 1', 'https://article1.example.com')
      .accounts(accounts)
      .signers([article])
      .rpc();

    const articleAccount = await program.account.article.fetch(article.publicKey);

    assert.equal(articleAccount.collector.toBase58(), program.provider.publicKey.toBase58());
    assert.equal(articleAccount.title, 'Article 1');
    assert.equal(articleAccount.link, 'https://article1.example.com');
    assert.ok(articleAccount.timestamp);
  });

  it("can add an article from another user", async () => {
    // set up otherUser account
    const otherUser: web3.Keypair = anchor.web3.Keypair.generate();
    // request money for other user
    const signature: string = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);

    const latestBlockhash = await program.provider.connection.getLatestBlockhash();

    const confirmationStrategy: web3.BlockheightBasedTransactionConfirmationStrategy = {
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature,
    }
    
    await program.provider.connection.confirmTransaction(confirmationStrategy);
    
    const article: web3.Keypair = web3.Keypair.generate();

    const accounts: Accounts = {
      article: article.publicKey,
      collector: otherUser.publicKey,
      systemProgram: web3.SystemProgram.programId,
    }

    await program.methods.addArticle('Article 2', 'https://article2.example.com')
      .accounts(accounts)
      .signers([article, otherUser])
      .rpc();

    const articleAccount = await program.account.article.fetch(article.publicKey);

    assert.equal(articleAccount.collector.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(articleAccount.title, 'Article 2');
    assert.equal(articleAccount.link, 'https://article2.example.com');
    assert.ok(articleAccount.timestamp);
  });
});
