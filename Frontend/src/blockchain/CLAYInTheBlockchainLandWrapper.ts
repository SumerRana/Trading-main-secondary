import Web3 from 'web3';
import CLAYInTheBlockchainLand from './contracts/CLAYInTheBlockchainLand';
import { ClayTokenAddress } from './constants';

export default class ClayInTheBlockchainLandWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: CLAYInTheBlockchainLand;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new CLAYInTheBlockchainLand(this.wrapperOptions, ClayTokenAddress.Contract[this.chainId]);
    }

    async balanceOf(): Promise<unknown> {
        try {
            const balance = await this.Contract.call('balanceOf', this.account);
            return balance;
        } catch (error) {
            throw error;
        }
    }

    async approve() {
        const value = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2^256 - 1)
        try {
            const tx = await this.Contract.send('approve', { from: this.account }, ClayTokenAddress.Contract[this.chainId], value);
            console.log(tx);
        } catch (error) {
            throw error;
        }
    }

    async allowance(): Promise<unknown> {
        try {
            const allowance = await this.Contract.call('allowance', this.account, ClayTokenAddress.Contract[this.chainId]);
            return allowance;
        } catch (error) {
            throw error;
        }
    }
}
