import { Component, OnInit } from '@angular/core';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { CITIZENS_ICON } from './config';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { ICitizen } from 'app/services/citizens/types';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  readonly title = 'Citizens';
  readonly citizenIcon = CITIZENS_ICON;
  total = 20;
  isAdding: boolean;
  addingMode: boolean;
  avatars: string[] = [];
  pageSize: number = 4;
  loaderItems = Array.from(Array(this.pageSize + 1).keys());
  isLoading: boolean = true;
  citizens: ICitizen[] = [
    {
      name: 'Hasan Daghash',
      age: 28,
      city: 'Dubai',
      note: 'Citizen since 1992'
    },

    {
      name: 'Mohammad Khaled Ahmad Kahled',
      age: 28,
      city: 'Amman',
      note:
        "Citizen since 1992Something like IP geolocation is probably part of a critical business processes and flow, so we built it (as all of our APIs) for use at scale and at blazing speeds. These aren't just marketing phrases, but fundamental features of our APIs."
    }
  ];
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
    // this.citizensService.getCitizens();
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
      .then(response => {
        this.messgaes.success('Citizen has been added 🎉');
        this.isAdding = false;
      })
      .catch(err => {
        this.isAdding = false;
        // TO BE GENERIC
        if (err.message) {
          const matches = err.message.match(/\{(.*?)\}/);
          console.log(err);
          try {
            const error = JSON.parse(matches[0]);
            const message = error.message;
            this.messgaes.info(message);
          } catch {
            this.messgaes.info('Somthing went wrong !');
          }
        }
      });
  }
}
