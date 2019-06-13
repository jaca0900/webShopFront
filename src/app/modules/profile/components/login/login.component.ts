import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { CONSTANTS } from '../../../shared/constants';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string;
  pass: string;
  status: number;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.login = '';
    this.pass = '';
    this.status = 200;
  }

  doLogin() {
    this.authService.login(this.login, this.pass).toPromise()
      .then(logged => {
        this.authService.isLoggedIn.next(true);
        StorageService.setToken(logged.token);
        StorageService.setItem('USER', { id: logged.userId });
        this.router.navigate([CONSTANTS.MAIN_ROUTES.HOME]);
        this.status = 200;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
