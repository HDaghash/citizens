import { Component, OnInit, Input } from '@angular/core';
import { ICONS } from './config';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('avatar') avatar;
  @Input('person') person;
  readonly notesMaxDisplay = 60;
  readonly icons = ICONS;
  editMode: boolean;
  constructor() {}

  ngOnInit(): void {}

  edit() {
    this.editMode = true;
  }

  submit($event) {}

  hideForm() {
    this.editMode = false;
  }
}
