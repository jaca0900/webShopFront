import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from '../../modules/profile/services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StorageService } from '../../modules/shared/services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${StorageService.getToken()}`
      })
    });

    return next.handle(authReq)
      .pipe(tap(
      () => {},
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authService.clearSession();
          }
        }
      }));
  }
}
