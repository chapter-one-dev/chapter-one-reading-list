import { computed, Ref, ComputedRef } from "vue";
import { AnchorWallet, useAnchorWallet } from "solana-wallets-vue";
import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { ChapterOneReadingList, IDL } from "@/idl/chapter_one_reading_list";

const programID = new PublicKey(process.env.VUE_APP_PROGRAM_ID ?? "");

let workspace: Workspace;

const clusterUrl: string = process.env.VUE_APP_CLUSTER_URL!;
const preflightCommitment = "processed";
const commitment: Commitment = "processed";

export interface Workspace {
  wallet: Ref<AnchorWallet | undefined>;
  connection: Connection;
  provider: ComputedRef<AnchorProvider>;
  program: ComputedRef<Program<ChapterOneReadingList>>;
}


export function useWorkspace(): Workspace {
  return workspace;
}

export const initWorkspace = () => {
  const wallet: Ref<AnchorWallet | undefined> = useAnchorWallet();
  const connection: Connection = new Connection(clusterUrl, commitment);

  const provider: ComputedRef<AnchorProvider> = computed(
    () =>
      new AnchorProvider(connection, wallet.value!, {
        preflightCommitment,
        commitment,
      })
  );
  const program: ComputedRef<Program<ChapterOneReadingList>> = computed(
    () => new Program(IDL, programID, provider.value)
  );

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};
