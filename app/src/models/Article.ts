import dayjs from "dayjs";
import "dayjs/plugin/relativeTime";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";


interface AccountData {
    collector: PublicKey;
    timestamp: BN;
    link: string;
    title: string;
}

export class Article {
    publicKey: PublicKey;
    collector: PublicKey;
    timestamp: string;
    link: string;
    title: string;

    constructor (publicKey: PublicKey, accountData: AccountData ) {
        this.publicKey = publicKey;
        this.collector = accountData.collector;
        this.timestamp = accountData.timestamp.toString();
        this.link = accountData.link;
        this.title = accountData.title;
    }

    get key () {
        return this.publicKey.toBase58()
    }

    get collector_display () {
        const author = this.collector.toBase58()
        return author.slice(0,4) + '..' + author.slice(-4)
    }

    get added_date () {
        return dayjs.unix(+this.timestamp).format('lll')
    }

    get created_ago () {
        return dayjs.unix(+this.timestamp).fromNow()
    }
}