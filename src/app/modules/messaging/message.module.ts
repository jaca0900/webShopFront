import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {InboxComponent} from "./components/inbox/inbox.component";
import {MessageRouter} from "./message.router";
import {DetailsComponent} from "./components/details/details.component";
import {ComposeComponent} from "./components/compose/compose.component";

@NgModule({
  declarations: [
    InboxComponent,
    DetailsComponent,
    ComposeComponent
  ],
  imports: [
    MessageRouter,
    SharedModule
  ],
  exports: [
    InboxComponent,
    DetailsComponent,
    ComposeComponent
  ]
})
export class MessageModule { }
