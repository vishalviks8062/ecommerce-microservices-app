import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/auth';  // adjust this to your Flask backend route

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // register(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, credentials);
  // }


  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((response: any) => {
  //       this.saveUser(response.user);  // saves user to localStorage
  //     })
  //   );
  // }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const fullUser = {
          ...response.user,
          token: response.token
        };
        this.saveUser(fullUser);
      })
    );
  }

  // login(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  // user.service.ts
  private userSubject = new BehaviorSubject<User | null>(this.getUser());
  user$ = this.userSubject.asObservable();

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // saveUser(user: User): void {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  getUser(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  // logout(): void {
  //   localStorage.removeItem('user');
  // }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
