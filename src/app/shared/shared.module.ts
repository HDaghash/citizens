import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvoidSanitizePipe } from 'app/shared/pipes/avoid-sanitize/avoid-sanitize.pipe';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [AvoidSanitizePipe],
  imports: [CommonModule, NzSkeletonModule, NzGridModule, NzPaginationModule],
  exports: [
    CommonModule,
    AvoidSanitizePipe,
    NzSkeletonModule,
    NzGridModule,
    NzPaginationModule
  ],
  providers: [AvatarsService]
})
export class SharedModule {}
