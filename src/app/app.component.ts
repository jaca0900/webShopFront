import {Component, OnInit} from '@angular/core';
import { StorageService } from './modules/shared/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    StorageService.setToken('AUTHTOKEN');
  }
}
