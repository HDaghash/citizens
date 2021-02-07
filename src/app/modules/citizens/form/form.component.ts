import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICitizen } from 'app/services/citizens/types';
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

  form = this.fb.group({
    name: [
      null
      // [Validators.required, Validators.minLength(3)]
    ],
    age: [
      null,
      [
        // Validators.required,
        // Validators.pattern(/^[0-9]*$/),
        // Validators.maxLength(3)
      ]
    ],
    city: [
      null
      // [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    note: [
      null
      // [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    ]
  });
  action: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.action = this.type === 'add' ? 'Add Citizen' : 'Save Change';
    if (this.citizen) {
      this.form.setValue(this.citizen);
    }
  }

  submit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.onSubmit.emit(data);
    }
  }

  back() {
    this.onBack.emit();
  }
}
