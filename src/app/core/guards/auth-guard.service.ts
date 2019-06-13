import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/profile/services/auth/auth.service';
import { StorageService } from '../../modules/shared/services/storage/storage.service';
import { CONSTANTS } from '../../modules/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private guard: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    this.guard = this.isTruhy();

    this.authService.isLoggedIn.subscribe(val => {
      this.guard = val;
    });

    if (!this.guard) {
      this.router.navigate([CONSTANTS.MAIN_ROUTES.SHOP]);
    }

    return this.guard;
  }

  private isTruhy() {
    return StorageService.getToken() !== null;
  }
}
