import { Component, OnInit } from '@angular/core';
import { CITIZENS_ICON } from './config';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  readonly title = 'Citizens';
  readonly citizenIcon = CITIZENS_ICON;
  constructor() {}

  ngOnInit(): void {}
}
