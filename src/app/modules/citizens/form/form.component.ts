import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output('onBack') onBack = new EventEmitter();
  @Output('onSubmit') onSubmit = new EventEmitter();

  form = this.fb.group({
    name: [null, [Validators.required]],
    age: [null, [Validators.required]],
    city: [null, [Validators.required]],
    note: [null, [Validators.required]]
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit();
    }
  }

  back() {
    this.onBack.emit();
  }
}
