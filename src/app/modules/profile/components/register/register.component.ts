import { Component, OnInit } from '@angular/core';
import { IUser } from './model/user.interface';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: IUser;

  constructor(
    private registerService: RegisterService
  ) {}

  ngOnInit() {
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
        console.log('Created User', response);
      }, (error) => {
        console.error(error);
      });
  }
}
