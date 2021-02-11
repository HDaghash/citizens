import { Injectable } from '@angular/core';
import { CITIZENS_ABI } from './abi';
import { ICitizen } from './types';
import { ContractService } from 'app/services/contract/contract.service';
import { Contract } from 'web3-eth-contract';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { HttpService } from '../http/http.service';
@Injectable()
export class CitizensService {
  onPastEvenets = new Subject();
  citizen: Contract;

  constructor(
    private contractService: ContractService,
    private httpService: HttpService
  ) {}

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
    return this.httpService.invoke({
      method: 'POST',
      url: environment.CLOUDFLARE_WORKER,
      path: '?method=getCitizenNoteById',
      body: {
        infuraUrl: environment.INFURA_URL,
        address: environment.ETHEREUM.ADDRESS,
        abi: CITIZENS_ABI,
        id
      }
    });
  }

  getPastEvents(filters, { start, end }) {
    return this.httpService.invoke({
      method: 'POST',
      url: environment.CLOUDFLARE_WORKER,
      path: '?method=getPastEvents',
      body: {
        event: 'Citizen',
        infuraUrl: environment.INFURA_URL,
        address: environment.ETHEREUM.ADDRESS,
        abi: CITIZENS_ABI,
        filters,
        start,
        end
      }
    });
  }
}
