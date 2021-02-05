import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { citizensRoutes } from './citizens.routing';

@NgModule({
  declarations: [ListComponent, FormComponent, CardComponent],
  imports: [SharedModule, RouterModule.forChild(citizensRoutes)]
})
export class CitizensModule {}
