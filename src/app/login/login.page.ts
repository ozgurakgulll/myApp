import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessager:string=''
  constructor(private _fb: FormBuilder,private  _serviceAuth:AuthService,private _navCtrl: NavController) {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this._serviceAuth.login(formData).subscribe({
        next: (response) => {
          console.log(response)
          localStorage.setItem('authToken', response.access_token);
          localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
          this._navCtrl.navigateForward('/').then(r => {});
        },
        error: (err) => {
          console.log(err)
          this.errorMessager=err[0]
        },
      });
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
