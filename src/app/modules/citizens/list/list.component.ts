import { Component, OnInit } from '@angular/core';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { CITIZENS_ICON } from './config';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { ICitizen } from 'app/services/citizens/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IReturnedValues } from './types';
import { NzModalService } from 'ng-zorro-antd/modal';

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
    this.avatarsService.getAvatars().subscribe(response => {
      if (response) {
        this.avatars = response.map(item => {
          return item.avatars[1].url;
        });
      }
    });

    this.getPastEvents({ start: 0, end: this.pageSize });
  }

  getPastEvents({ start, end }) {
    this.isLoading = true;
    this.citizensService
      .getPastEvents(
        { fromBlock: 'earliest', toBlock: 'latest' },
        { start, end }
      )
      .subscribe(
        (response: IReturnedValues[]) => {
          this.isLoading = false;
          this.citizens = this.mapCitizens(response);
          this.isLoading = false;
          this.currentPage = end / this.pageSize;
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
        this.getPastEvents({ start: 0, end: this.pageSize });
      })
      .catch(error => {
        const message = error || 'Somthing went wrong!';
        this.isAdding = false;
        this.messgaes.info(message);
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
          nzClosable: true
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

  onPaginate(page) {
    const start = page * this.pageSize - this.pageSize;
    const end = start + this.pageSize;
    this.currentPage = page;
    this.getPastEvents({ start, end });
  }
}
