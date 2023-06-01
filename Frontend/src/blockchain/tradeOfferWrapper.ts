import Web3 from 'web3';
import tradeOffer from './contracts/tradeOffer';
import { tradeOfferAddress } from './constants';

//work here

export default class tradeOfferWrapper {
  web3: Web3;
  chainId: number;
  account: string;
  wrapperOptions: any;
  Contract: tradeOffer;

  constructor(web3, chainId, account, options = {}) {

    this.web3 = web3;
    this.chainId = chainId;
    this.account = account;

    this.wrapperOptions = {
      web3, chainId, account, ...options
    }

    this.Contract = new tradeOffer(this.wrapperOptions, tradeOfferAddress.Contract[this.chainId]);
  }

  async balanceOf(): Promise<unknown> {
    try {
      const balance = await this.Contract.call("balanceOf", this.account);
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async makeOffer(
    _offerAmount1: number,
    _offerAmount2: number,
    _offerAmount3: number,
    _offerAmount4: number,
    _offerAmount5: number,

    _wantedAmount1: number,
    _wantedAmount2: number,
    _wantedAmount3: number,
    _wantedAmount4: number,
    _wantedAmount5: number): Promise<unknown> {
    try {
      const tx = await this.Contract.send(
        "makeOffer", 
      { from: this.account },
        _offerAmount1,
        _offerAmount2,
        _offerAmount3,
        _offerAmount4,
        _offerAmount5,

        _wantedAmount1,
        _wantedAmount2,
        _wantedAmount3,
        _wantedAmount4,
        _wantedAmount5);
      return tx;
    } catch (error) {
      throw error;
    }
  }

  async acceptOffer(_offerId: number): Promise<unknown> {
    try {
      const tx = await this.Contract.send("tokenOfOwnerByIndex", this.account, _offerId);
      return tx;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(_offerId: number): Promise<unknown> {
    try {
      const tx = await this.Contract.send("withdraw", this.account, _offerId);
      return tx;
    } catch (error) {
      throw error;
    }
  }

  async getContractAssets() : Promise<unknown> {
    try {
        const ContractAssets = await this.Contract.call("getContractAssets");
        return ContractAssets;
    } catch (error) { 
        throw error;
    }
  }

  async getOffer(_offerId: number) : Promise<unknown> {
    try {
        const Offer = await this.Contract.call("getOffer", _offerId);
        return Offer;
    } catch (error) { 
        throw error;
    }
  }

  async getOfferString(_offerId: number) : Promise<unknown> {
    try {
        const OfferString = await this.Contract.call("getOfferString", _offerId);
        return OfferString;
    } catch (error) { 
        throw error;
    }
  }

  
}