import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvoidSanitizePipe } from 'app/shared/pipes/avoid-sanitize/avoid-sanitize.pipe';
import { AvatarsService } from 'app/services/avatars/avatars.service';

@NgModule({
  declarations: [AvoidSanitizePipe],
  imports: [CommonModule],
  exports: [CommonModule, AvoidSanitizePipe],
  providers: [AvatarsService]
})
export class SharedModule {}
