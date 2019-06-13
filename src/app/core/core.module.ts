import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../modules/shared/shared.module';
import { ProfileModule } from '../modules/profile/profile.module';
import { PageNotFoundModule } from '../modules/page-not-found/page-not-found.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavbarModule } from '../modules/navbar/navbar.module';
import { ItemModule } from '../modules/items/item.module';


@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    NavbarModule,
    ProfileModule,
    PageNotFoundModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [
    HttpClientModule,
    SharedModule,
    NavbarModule,
    ProfileModule,
    PageNotFoundModule
  ]
})
export class CoreModule { }
