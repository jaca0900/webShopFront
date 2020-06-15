import {Component, OnInit} from "@angular/core";
import {IUser} from "../../../profile/components/register/model/user.interface";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ProfileService} from "../../../profile/services/auth/profile.service";
import {ToastService} from "../../../shared/components/toast/toast.service";

@Component({
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit{
  message: {[key: string]: any};
  user: IUser;

  constructor(private profileService: ProfileService, private toastService: ToastService) {
    this.message = {
      content: ''
    }
  }

  ngOnInit() {
    this.message = StorageService.getItem('MESSAGE');
    console.log(this.message, 'StorageService', StorageService.getItem('MESSAGE'));
    !this.message.sender_id ? this.user = {
      first_name: 'not',
      last_name: 'found'
    } as IUser : this.profileService.getUserById(this.message.sender_id)
      .subscribe((users) => {
        this.user = users[0];
      }, (err) => {
        this.toastService.show({
          title: 'Error',
          message: err.message,
          classname: 'bg-danger'
        });
        this.user = {
          first_name: 'not',
          last_name: 'found'
        } as IUser;
      })
  }
}