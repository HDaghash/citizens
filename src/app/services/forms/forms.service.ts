import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormService {
  constructor() {}

  /**
   * update form validatiy for each controls one by one
   * @param form
   */
  updateFormValidity(form: FormGroup) {
    Object.keys(form.controls).forEach(name => {
      const control = form.controls[name];
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }
}
