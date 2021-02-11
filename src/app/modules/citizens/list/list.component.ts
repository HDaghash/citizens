import { Component, OnInit } from '@angular/core';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { CITIZENS_ICON } from './config';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { ICitizen } from 'app/services/citizens/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IReturnedValues } from './types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  readonly citizenIcon = CITIZENS_ICON;
  total: number = 20;
  isAdding: boolean;
  isCardLoading: boolean;
  addingMode: boolean;
  cardIndex: Number;
  avatars: string[] = [];
  pageSize: number = 4;
  loaderItems = Array.from(Array(this.pageSize + 1).keys());
  isLoading: boolean = true;
  citizens: ICitizen[] = [];
  currentPage = 1;

  constructor(
    private avatarsService: AvatarsService,
    private citizensService: CitizensService,
    private messgaes: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getCitizenWithAvatr({ start: 0, end: this.pageSize });
  }

  getPastEvents({ start, end }) {
    this.isLoading = true;
    this.citizensService
      .getPastEvents(
        { fromBlock: 'earliest', toBlock: 'latest' },
        { start, end }
      )
      .subscribe(
        (response: { citizens: IReturnedValues[]; total: number }) => {
          const { citizens, total } = response;
          this.isLoading = false;
          this.citizens = this.mapCitizens(citizens);
          this.isLoading = false;
          this.currentPage = end / this.pageSize;
          this.total = total;
        },
        error => {
          this.isLoading = false;
        }
      );
  }

  addCitizen() {
    this.addingMode = true;
  }

  hideForm() {
    this.addingMode = false;
  }

  submit($event) {
    this.isAdding = true;
    this.citizensService
      .addCitizen($event)
      .then(() => {
        this.isAdding = false;
        this.isLoading = true;
        this.messgaes.success('Citizen has been added 🎉');
        this.getCitizenWithAvatr({ start: 0, end: this.pageSize });
      })
      .catch(error => {
        const message = this.handleError(error.message);
        this.messgaes.error(message);
        this.isAdding = false;
      });
  }

  getNoteById(id, index) {
    this.isCardLoading = true;
    this.cardIndex = index;
    this.citizensService.getCitizenNoteById(id).subscribe(
      response => {
        this.modal.create({
          nzTitle: 'Note',
          nzContent: response,
          nzClosable: true,
          nzFooter: null
        });
        this.isCardLoading = false;
      },
      errror => {
        this.isCardLoading = false;
      }
    );
  }

  mapCitizens(response: IReturnedValues[]) {
    let citizens = [];
    if (response) {
      citizens = response.map(citizen => {
        const { id, age, city, name } = citizen.returnValues;
        return { id, age, city, name };
      });
    }
    return citizens;
  }

  getCitizenWithAvatr(pagination) {
    const requests = [this.getPastEvents(pagination), this.getFakeAvatars()];
    return forkJoin(requests);
  }

  getFakeAvatars() {
    this.avatarsService.getAvatars().subscribe(response => {
      if (response) {
        this.avatars = response.map(item => {
          return item.avatars[1].url;
        });
      }
    });
  }

  handleError(error) {
    const errorMesasage = 'Somthing went wrong!';
    if (typeof error === 'string') {
      const errorWord = error.match(/Error: [\s\S]*:/i);
      return errorWord ? errorWord : errorMesasage;
    }
    return error ? error.message : errorMesasage;
  }

  onPaginate(page) {
    const start = page * this.pageSize - this.pageSize;
    const end = start + this.pageSize;
    this.currentPage = page;
    this.getCitizenWithAvatr({ start, end });
  }
}
