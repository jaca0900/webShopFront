import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InboxComponent} from "./components/inbox/inbox.component";
import {AuthGuard} from "../../core/guards/auth-guard.service";
import {DetailsComponent} from "./components/details/details.component";
import {ComposeComponent} from "./components/compose/compose.component";
// canActivate: [AuthGuard]
const childRoutes: Routes = [
  { path: '', component: InboxComponent },
  { path: 'read', component: DetailsComponent },
  { path: 'compose', component: ComposeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessageRouter {}
