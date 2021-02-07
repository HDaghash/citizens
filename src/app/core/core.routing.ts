import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { CITIZENS_ROUTE } from './routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: CITIZENS_ROUTE,
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('app/modules/citizens/citizens.module').then(
            m => m.CitizensModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
