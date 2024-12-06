import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SessionGuard implements CanActivate {
    constructor(private _router: Router) {}

    canActivate(): boolean {
      // `localStorage`'da "user" anahtarını kontrol ediyoruz.
      const user = localStorage.getItem('user');

      if (user) {
        // Kullanıcı bilgisi varsa erişime izin ver.
        console.log('User is logged in:', user);

        return true;
      } else {
        // Kullanıcı bilgisi yoksa giriş sayfasına yönlendir.
        console.log('No user found, redirecting to login...');
        this._router.navigate(['/login']);
        return false;
      }
    }
}
