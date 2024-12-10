import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './shared/services/auth.service';
import * as ionIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private _authService: AuthService) {
    addIcons({ ...ionIcons });

    const token = localStorage.getItem('authToken') || false;
    if (token) {
      this._authService.autoLogin(token).subscribe({
        next: (response) => {
          localStorage.setItem('userInfo', JSON.stringify(response));
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
