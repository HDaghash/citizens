import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvoidSanitizePipe } from 'app/shared/pipes/avoid-sanitize/avoid-sanitize.pipe';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CitizenContractService } from 'app/services/citizen-contract/citizen-contract.service';

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
    NzIconModule,
    NzFormModule,
    NzInputModule
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
    NzInputModule
  ],
  providers: [AvatarsService, CitizenContractService]
})
export class SharedModule {}
