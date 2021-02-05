import { Component, OnInit } from '@angular/core';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { IPerson } from './types';
import { CITIZENS_ICON } from './config';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  readonly title = 'Citizens';
  readonly citizenIcon = CITIZENS_ICON;
  persons: IPerson[] = [
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
  addingMode: boolean;
  avatars: string[] = [];

  pageSize: number = 4;
  loaderItems = Array.from(Array(this.pageSize + 1).keys());
  isLoading: boolean = true;
  total = 20;
  constructor(private avatarsService: AvatarsService) {}

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
  }

  addCitizen() {
    this.addingMode = true;
  }

  hideForm() {
    this.addingMode = false;
  }
}
