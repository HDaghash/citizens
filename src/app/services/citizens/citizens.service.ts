import { Injectable } from '@angular/core';
import { CITIZENS_ABI } from './abi';
import { ICitizen } from './types';
import { ContractService } from 'app/services/contract/contract.service';
import { environment } from 'environments/environment';

@Injectable()
export class CitizensService {
  citizen: any;

  constructor(private contractService: ContractService) {}

  async addCitizen(citizen: ICitizen) {
    return this.contractService
      .getAccount()
      .then(async ({ web3js, accounts }) => {
        this.citizen = new web3js.eth.Contract(
          CITIZENS_ABI,
          environment.ETHEREUM.ADDRESS
        );
        const { age, city, name, note } = citizen;
        const citizens = await this.citizen.methods
          .addCitizen(age, city, name, note)
          .call({ from: accounts[0] });
        return citizens;
      });
  }
}
