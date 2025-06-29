import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storedUser = localStorage.getItem('user');
    let token: string | null = null;
    console.log("Hi");
    console.log(storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Hi1");
      console.log(parsedUser);
      token = parsedUser.access_token;  
      console.log("Hi2");
      console.log(token);
    }

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

