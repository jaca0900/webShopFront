import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CONSTANTS } from '../../../shared/constants';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { LoginResponse } from '../../../shared/interfaces/login-response.interface';
import * as uuid from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(login: string, password: string): Observable<any> {

    return this.http.post<any>('http://localhost:8000/login', { login, password });
  }

  logout(): Promise<Boolean> {
    StorageService.removeItem('AUTHTOKEN');
    StorageService.clearCart();
    this.isLoggedIn.next(false);
    return this.router.navigate([CONSTANTS.MAIN_ROUTES.LOGIN]);
  }

  clearSession() {
    StorageService.removeItem('user');
    this.isLoggedIn.next(false);
    this.router.navigate([CONSTANTS.MAIN_ROUTES.LOGIN]);
  }
}
