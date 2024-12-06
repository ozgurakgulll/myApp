import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): boolean {
    const user= localStorage.getItem('authToken');
    if (user) {
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }
}
