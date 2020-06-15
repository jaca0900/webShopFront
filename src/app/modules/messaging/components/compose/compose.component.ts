import {Component, OnInit} from "@angular/core";
import {IUser} from "../../../profile/components/register/model/user.interface";
import {ProfileService} from "../../../profile/services/auth/profile.service";
import {MessageService} from "../services/message.service";
import {ToastService} from "../../../shared/components/toast/toast.service";
import {StorageService} from "../../../shared/services/storage/storage.service";

@Component({
  templateUrl: './compose.component.html'
})
export class ComposeComponent implements OnInit{
  message: {[key: string]: any};
  users: IUser[];

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.profileService.getAll()
      .subscribe(
        (users) => this.users = users,
        () => this.toastService.show({
          title: 'Error',
          message: 'Unable to get users',
          classname: 'bg-danger'
        }));

    this.message = {
      title: '',
      content: '',
      sender_id: StorageService.getItem('USER').id,
      receiver_id: StorageService.getItem('USER').id
    }
  }

  setReceiver(userId: string) {
    this.message.sendDate = new Date();
    this.message.receiver_id = parseInt(userId);
  }

  saveMessage() {
    console.log('Save Message');
    this.messageService.create(this.message)
      .subscribe(() => this.toastService.show({
        title: 'Success',
        message: 'Message successfully sent',
        classname: 'bg-success'
      }), () => this.toastService.show({
        title: 'Error',
        message: 'Message was not sent',
        classname: 'bg-danger'
      }));
  }
}