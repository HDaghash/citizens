import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICitizen } from 'app/services/citizens/types';
import { CitizensService } from 'app/services/citizens/citizens.service';
import { FormService } from 'app/services/forms/forms.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input('type') type: 'add' | 'edit';
  @Input('citizen') citizen: ICitizen;
  @Output('onBack') onBack = new EventEmitter();
  @Output('onSubmit') onSubmit = new EventEmitter();
  isLoading: boolean;
  action: string;
  form = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(4)]],
    age: [
      null,
      [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern(/(?:1[89]|[2-9][0-9]|1[0-4][0-9]|150)/)
      ]
    ],
    city: [null, [Validators.required, Validators.minLength(3)]],
    someNote: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: FormBuilder,
    private citizensService: CitizensService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.action = this.type === 'add' ? 'Add Citizen' : 'Save Change';
    if (this.citizen && this.type === 'edit') {
      const { name, age, city, id } = this.citizen;
      const data = { name, age, city, someNote: '' };
      this.fetchNote(id);
      this.form.setValue(data);
    }
  }

  fetchNote(id: number) {
    this.isLoading = true;
    this.citizensService.getCitizenNoteById(id).subscribe(
      response => {
        this.form.controls.someNote.setValue(response);
        this.isLoading = false;
      },
      errror => {
        this.isLoading = false;
      }
    );
  }

  submit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.onSubmit.emit(data);
    } else {
      this.formService.updateFormValidity(this.form);
    }
  }

  back() {
    this.onBack.emit();
  }
}
