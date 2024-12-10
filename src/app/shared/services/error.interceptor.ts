import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const nav = inject(NavController);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Hataları burada işleyin
      console.error('Error occurred:', error);

      if (error.status === 401) {
        // Yetkilendirme hatası
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        nav.navigateRoot(['/login']); // Login sayfasına yönlendirme
      }

      // Hata fırlatma
      return throwError(() => error);
    })
  );
};
