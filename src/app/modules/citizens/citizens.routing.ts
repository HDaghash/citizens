import { Routes } from '@angular/router';
import { CITIZENS_ROUTE } from '../../core/routes';
import { ListComponent } from './list/list.component';

export const citizensRoutes: Routes = [
  {
    path: CITIZENS_ROUTE,
    component: ListComponent,
    data: {
      title: 'Citizens'
    }
  }
];
