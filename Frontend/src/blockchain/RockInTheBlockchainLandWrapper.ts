import Web3 from 'web3';
import RockInTheBlockchainLand from './contracts/RockInTheBlockchainLand';
import { RockTokenAddress } from './constants';

export default class RockInTheBlockchainLandWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: RockInTheBlockchainLand;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3,
            chainId,
            account,
            ...options
        }

        this.Contract = new RockInTheBlockchainLand(this.wrapperOptions, RockTokenAddress.Contract[this.chainId]);
    }

    async balanceOf(): Promise<unknown> {
        try {
            const balance = await this.Contract.call("balanceOf", this.account);
            return balance;
        } catch (error) {
            throw error;
        }
    }

    async approve(spender: string, value: string) {
        try {
            const tx = await this.Contract.send("approve", { from: this.account }, spender, value);
            console.log(tx);
        } catch (error) {
            throw error;
        }
    }

    async allowance(owner: string, spender: string): Promise<unknown> {
        try {
            const allowance = await this.Contract.call("allowance", owner, spender);
            return allowance;
        } catch (error) {
            throw error;
        }
    }
}