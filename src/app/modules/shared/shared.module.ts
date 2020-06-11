import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ToastComponent} from "./components/toast/toast.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [ CommonModule, NgbModule ],
  providers: [],
  bootstrap: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,
    NgbModule
  ]
})
export class SharedModule {}
