import { ProfileService } from '../../profile/services/auth/profile.service';
import { Subscription } from 'rxjs';
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  public isLoggedIn = false;
  constructor(
    private router: Router,
    private authService: ProfileService,
  ) {}

  ngOnInit() {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }

  logout(): void {
    this.authService.logout().then(
      () => {},
      error => {
        console.error('Error logout subscribe', error);
      });
  }

  subscribe(): void {
    this.subs.push(
      this.authService.isLoggedIn.subscribe(value => {
        this.isLoggedIn = value;
      })
    );
  }

}
