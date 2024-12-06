import {Component, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent{
  constructor(private _authService:AuthService) {
    const token= localStorage.getItem('authToken') ||''
    console.log(token)
    this._authService.autoLogin(token).subscribe({
      next: (response) => {
        localStorage.setItem('userInfo', JSON.stringify(response));
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

}
