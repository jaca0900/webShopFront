import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IItem } from '../../models/item.interface';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {}

  create(item: IItem): Observable<IItem> {
    return this.http.post<IItem>('http://localhost:8000/item/create', item);
  }

  getAll(): Observable<IItem[]> {
    return this.http.get<IItem[]>('http://localhost:8000/item/all');
  }

  getForLoggedUser(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`http://localhost:8000/item/byUser/${StorageService.getItem('USER').userId}`);
  }
}
