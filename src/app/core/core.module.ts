import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './core.routing';
import { AppComponent } from './core.component';
import { MainComponent } from './layouts/main/main.component';
import { HttpService } from 'app/services/http/http.service';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import en from '@angular/common/locales/en';
registerLocaleData(en);

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [HttpService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
