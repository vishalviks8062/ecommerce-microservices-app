// services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  isAdmin(): boolean {
    return this.getUsername() === 'admin';
  }

  getLoggedInUsername(): string | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser.access_token;
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload?.sub || null;
      }
    }
    return null;
  }
  
}
