import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8000/user/create', user);
  }
}
