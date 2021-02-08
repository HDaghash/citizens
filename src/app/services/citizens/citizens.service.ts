import { Injectable } from '@angular/core';
import { CITIZENS_ABI } from './abi';
import { ICitizen } from './types';
import { ContractService } from 'app/services/contract/contract.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class CitizensService {
  onPastEvenets = new Subject();
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
        const { age, city, name, someNote } = citizen;
        const citizens = await this.citizen.methods
          .addCitizen(age, city, name, someNote)
          .send({ from: accounts[0] });
        return citizens;
      });
  }

  getCitizenNoteById(id: number) {
    return (
      this.contractService
        // @ts-ignore
        .getSocketContract(CITIZENS_ABI, environment.ETHEREUM.ADDRESS)
        .methods.getNoteByCitizenId(id)
        .call()
    );
  }

  getPastEvents() {
    this.contractService
      // @ts-ignore
      .getSocketContract(CITIZENS_ABI, environment.ETHEREUM.ADDRESS)
      .getPastEvents('Citizen', { fromBlock: '0' })
      .then(response => {
        this.onPastEvenets.next(response);
      });
  }
}
