import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

export function maxLengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.length >= 8) {
      return of(null); // Hợp lệ
    }
    return of({ maxLengInValid: true }); // Không hợp lệ
  };
}
