import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { SharedModule } from 'app/shared/shared.module';
import { HttpService } from 'app/services/http/http.service';
import { AvatarsService } from 'app/services/avatars/avatars.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [ListComponent],
        providers: [HttpService, AvatarsService, HttpClient, HttpHandler]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
