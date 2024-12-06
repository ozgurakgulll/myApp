import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OfflineGuardService implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): boolean {
    const user= localStorage.getItem('authToken');
    if (user) {
      this._router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
}
