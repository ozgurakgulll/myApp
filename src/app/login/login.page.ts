import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      console.log('Form Değerleri:', this.loginForm.value);
    } else {
      console.log('Form geçersiz.');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Bu alan zorunludur.';
    }
    if (control?.hasError('minlength')) {
      return `En az ${control.errors?.['minlength'].requiredLength} karakter olmalı.`;
    }
    return '';
  }
}
