import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { HttpService } from 'app/services/http/http.service';
import { SharedModule } from 'app/shared/shared.module';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, SharedModule],
        declarations: [FormComponent],
        providers: [HttpService, CitizensService, HttpClient, HttpHandler]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty form is invalid', () => {
    component.form.controls.name.setValue('');
    component.form.controls.age.setValue('');
    component.form.controls.city.setValue('');
    component.form.controls.someNote.setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('form shoudl be valid', () => {
    component.form.controls.name.setValue('Testing Name');
    component.form.controls.age.setValue('28');
    component.form.controls.city.setValue('Testing City');
    component.form.controls.someNote.setValue('Testing Note');
    expect(component.form.valid).toBeTruthy();
  });
});
