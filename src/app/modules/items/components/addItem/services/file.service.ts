import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
  ) {
  }

  upload(file: File, itemId: number): Observable<any> {
    console.log('Upload file', file);
    const formData = new FormData();

    formData.append('Photo', file);
    formData.append('item_id', itemId.toString());

    return this.http.post('http://localhost:8000/files/upload', formData);
  }
}