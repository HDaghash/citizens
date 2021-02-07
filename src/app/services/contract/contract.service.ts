import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Injectable } from '@angular/core';
import { MODAL_THEME } from './config';
import { environment } from 'environments/environment';

@Injectable()
export class ContractService {
  public web3js: any;
  public provider: any;
  public accounts: any;
  public web3Modal: any;

  constructor() {
    this.initWallet();
  }

  initWallet() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: environment.WALLET.INFURA_ID
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: environment.ETHEREUM.NETWORK,
      cacheProvider: true,
      providerOptions,
      theme: MODAL_THEME
    });
  }

  async connectAccount() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
  }

  async getAccount() {
    await this.connectAccount();
    return { web3js: this.web3js, accounts: this.accounts };
  }
}
