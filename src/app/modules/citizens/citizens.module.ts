import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CitizenCardComponent } from './citizen-card/citizen-card.component';
import { FormComponent } from './form/form.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [ListComponent, CitizenCardComponent, FormComponent, CardComponent],
  imports: [
    CommonModule
  ]
})
export class CitizensModule { }
