import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

dayjs.extend(relativeTime);


interface AccountData {
    collector: PublicKey;
    timestamp: BN;
    link: string;
}

export class Article {
    publicKey: PublicKey;
    collector: PublicKey;
    timestamp: Dayjs;
    link: string;

    constructor (publicKey: PublicKey, accountData: AccountData ) {
        this.publicKey = publicKey;
        this.collector = accountData.collector;
        this.timestamp = dayjs.unix(parseInt(accountData.timestamp.toString()));
        this.link = accountData.link;
    }

    get key () {
        return this.publicKey.toBase58()
    }

    get collector_display () {
        const author = this.collector.toBase58()
        return author.slice(0,4) + '..' + author.slice(-4)
    }

    get added_date () {
        return this.timestamp.format('MMM D, YYYY')
    }

    get created_ago () {
        return this.timestamp.fromNow()
    }
}