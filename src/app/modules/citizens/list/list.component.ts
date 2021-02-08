import { Component, OnInit } from '@angular/core';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { CITIZENS_ICON } from './config';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { ICitizen } from 'app/services/citizens/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IReturnedValues } from './types';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  readonly citizenIcon = CITIZENS_ICON;
  total: number = 20;
  isAdding: boolean;
  addingMode: boolean;
  avatars: string[] = [];
  pageSize: number = 4;
  loaderItems = Array.from(Array(this.pageSize + 1).keys());
  isLoading: boolean = true;
  citizens: ICitizen[] = [];
  constructor(
    private avatarsService: AvatarsService,
    private citizensService: CitizensService,
    private messgaes: NzMessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.avatarsService.getAvatars().subscribe(
      response => {
        if (response) {
          this.avatars = response.map(item => {
            return item.avatars[1].url;
          });
          this.isLoading = false;
        }
      },
      error => {
        this.isLoading = false;
      }
    );

    this.citizensService.watchCitizen();

    this.citizensService.onPastEvenets.subscribe(
      (response: IReturnedValues[]) => {
        this.citizens = this.mapCitizens(response);
        console.log(response);
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
        this.messgaes.success('Citizen has been added 🎉');
        this.isAdding = false;
      })
      .catch(error => {
        const message = error || 'Somthing went wrong!';
        this.isAdding = false;
        this.messgaes.info(message);
      });
  }

  mapCitizens(resposne: IReturnedValues[]) {
    if (resposne) {
      return resposne.map(citizen => {
        const { id, age, city, name, someNote } = citizen.returnValues;
        return { id, age, city, name, someNote };
      });
    }
  }
}
