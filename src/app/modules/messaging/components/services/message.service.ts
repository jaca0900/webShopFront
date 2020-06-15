import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {}

  create(message: any): Observable<any> {
    console.log(message);
    return this.http.post<any>('http://localhost:8000/message/send', message);
  }

  getReceived(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/message/received?receiverId=${StorageService.getItem('USER').id}`);
  }

  getSent(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/message/sent?senderId=${StorageService.getItem('USER').id}`);
  }
}
