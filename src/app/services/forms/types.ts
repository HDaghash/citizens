import { AbstractControl } from '@angular/forms';

export interface FormConfig {
  type: string;
  submitText: string;
  cancelText?: string;
  deleteText?: string;
}

export interface FormServerErrors {
  [key: string]: string;
}

export interface FormControls {
  [key: string]: AbstractControl;
}
