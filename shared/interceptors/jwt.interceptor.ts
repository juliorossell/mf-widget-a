import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { sharedEnvironment } from '../environments/environment.shared';
export const BYPASS_JW_TOKEN = new HttpContextToken(() => false);

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = localStorage.getItem('currentUser');
    const token: string = currentUser ? JSON.parse(currentUser)?.token : null;

    if (token && !request.url.includes(sharedEnvironment.STATIC_CONTENT)) {
      const requestClone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.context.get(BYPASS_JW_TOKEN) === true) {
        return next.handle(request);
      }
      return next.handle(requestClone);
    }
    return next.handle(request);
  }
}
