import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clonedRequest: HttpRequest<any>;
    // const baseURL = 'http://localhost:5001';
    // const baseURL = 'http://motazali-001-site1.dtempurl.com';

    if (this.authService.isUserLogged()) {
      clonedRequest = req.clone({
        url: `${this.authService.getBaseURL()}/${req.url}`,
        setHeaders: {
          Authorization: `Bearer ${this.authService.getUserToken()}`,
        },
      });
    } else {
      clonedRequest = req.clone({
        url: `${this.authService.getBaseURL()}/${req.url}`,
      });
    }
    console.log(clonedRequest);

    return next.handle(clonedRequest);
  }

  getBaseURL(): string {
    return this.authService.getBaseURL();
  }
}
