import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICONS } from './config';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output('onShowNote') onShowNote = new EventEmitter();
  @Input('avatar') avatar;
  @Input('citizen') citizen;
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

  showNote(id: number) {
    this.onShowNote.emit(id);
  }
}
