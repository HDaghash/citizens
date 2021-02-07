import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Subject } from 'rxjs';
import { CITIZENS_ADDRESS, CITIZENS_ABI } from './abi';
@Injectable()
export class CitizenContractService {
  web3js: any;
  provider: any;
  accounts: any;
  citizen: any;
  web3Modal;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  private newOrganization = new Subject<any>();
  newOrganization$ = this.newOrganization.asObservable();

  constructor() {}
  init() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID' // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: 'ropsten', // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)'
      }
    });
    console.log('inited');
  }
  // async connectAccount() {
  //   this.web3Modal.clearCachedProvider();

  //   this.provider = await this.web3Modal.connect();
  //   this.web3js = new Web3(this.provider);
  //   this.accounts = await this.web3js.eth.getAccounts();
  //   this.accountStatusSource.next(this.accounts);
  // }

  // async getCitizen() {
  //   this.provider = await this.web3Modal.connect(); // set provider
  //   this.web3js = new Web3(this.provider); // create web3 instance
  //   this.accounts = await this.web3js.eth.getAccounts();

  //   this.citizen = new this.web3js.eth.Contract(CITIZENS_ABI, CITIZENS_ADDRESS);

  //   const citizens = await this.citizen.methods
  //     .getCitizens()
  //     .call({ from: this.accounts[0] });

  //   return citizens;
  // }
}
