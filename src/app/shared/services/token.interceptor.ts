import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  let authReq = req;
  const token = localStorage.getItem('authToken')
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
         router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
