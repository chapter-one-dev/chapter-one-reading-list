import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ChapterOneReadingList } from "../target/types/chapter_one_reading_list";

describe("chapter-one-reading-list", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ChapterOneReadingList as Program<ChapterOneReadingList>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
