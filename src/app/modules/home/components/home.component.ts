import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProfileService} from '../../profile/services/auth/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;

  constructor(
    private authService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = 'Were game';
  }
}
