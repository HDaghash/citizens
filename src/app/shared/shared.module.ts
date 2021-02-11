import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AvoidSanitizePipe } from 'app/shared/pipes/avoid-sanitize/avoid-sanitize.pipe';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ContractService } from 'app/services/contract/contract.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormService } from 'app/services/forms/forms.service';
import { FormBuilder } from '@angular/forms';
import { ArrowLeftOutline, SaveOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [ArrowLeftOutline, SaveOutline];

@NgModule({
  declarations: [AvoidSanitizePipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzSkeletonModule,
    NzGridModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    NzSpinModule,
    NzModalModule,
    NzToolTipModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AvoidSanitizePipe,
    NzSkeletonModule,
    NzGridModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    NzSpinModule,
    NzModalModule,
    NzToolTipModule
  ],
  providers: [
    AvatarsService,
    CitizensService,
    ContractService,
    FormService,
    FormBuilder
  ]
})
export class SharedModule {}
