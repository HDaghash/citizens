import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Injectable } from '@angular/core';
import { MODAL_THEME } from './config';
import { environment } from 'environments/environment';
import { AbiItem } from '../citizens/abi';

@Injectable()
export class ContractService {
  private web3js: any;
  private provider: any;
  private accounts: any;
  private web3Modal: any;
  private socket = new Web3(environment.INFURA.SOCKET_URL);
  private httpProvider = new Web3.providers.HttpProvider(
    environment.INFURA.PROVIDER_URL
  );
  private web3Provider = new Web3(this.httpProvider);

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

  getHttpProvider(abi: AbiItem, address: string) {
    return new this.web3Provider.eth.Contract(abi, address);
  }

  getSocketContract(abi: AbiItem, address: string) {
    return new this.socket.eth.Contract(abi, address);
  }
}
