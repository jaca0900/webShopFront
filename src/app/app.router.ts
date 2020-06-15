import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './modules/page-not-found/components/page-not-found.component';

import { AuthGuard } from './core/guards/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'shop', loadChildren: './modules/items/item.module#ItemModule' },
  { path: 'mail', loadChildren: './modules/messaging/message.module#MessageModule'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true,
      },
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouter {}
