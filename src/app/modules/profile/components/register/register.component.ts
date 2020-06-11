import { Component, OnInit } from '@angular/core';
import { IUser } from './model/user.interface';
import { RegisterService } from './services/register.service';
import {ToastService} from "../../../shared/components/toast/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: IUser;

  constructor(
    private registerService: RegisterService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.clearUser();
  }

  clearUser() {
    this.user = {
      id: null,
      first_name: '',
      last_name: '',
      login: '',
      pass: '',
      payment_methods: '',
      email: '',
      addres: '',
      bank: '',
    };
  }

  doRegister() {
    const request = this.registerService.create(this.user);

    request.subscribe(
      (response) => {
        this.clearUser();

        this.toastService.show({
          title: 'Registration success',
          message: 'Your user has bean created you can now log in',
          classname: 'bg-success'
        });
      }, (error) => {

        this.toastService.show({
          title: 'Registration Error',
          message: error.message,
          classname: 'bg-danger'
        });
      });
  }
}
