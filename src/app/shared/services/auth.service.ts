import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // API URL'niz

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/auth/create-user`, userData);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<any>(`${this.apiUrl}/user-delete/${userId}`);
  }

  login(userData: {
    user: string;
    password: string;
  }): Observable<{ access_token: string; userInfo: User }> {
    return this.http.post<{ access_token: string; userInfo: User }>(
      `${this.apiUrl}/auth/login`,
      userData
    );
  }
  autoLogin(access_token: string): Observable<{ userInfo: User }> {
    return this.http.get<{ userInfo: User }>(`${this.apiUrl}/auth/autoLogin`);
  }
}
