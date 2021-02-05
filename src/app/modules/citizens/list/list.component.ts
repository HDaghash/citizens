import { Component, OnInit } from '@angular/core';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { IPerson } from './types';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  avatars: string[] = [];
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
  constructor(private avatarsService: AvatarsService) {}

  ngOnInit(): void {
    this.avatarsService.getAvatars().subscribe(response => {
      if (response) {
        this.avatars = response.map(item => {
          return item.avatars[1].url;
        });
      }
    });
  }
}
