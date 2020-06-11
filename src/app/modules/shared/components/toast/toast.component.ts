import {Component} from "@angular/core";
import {ToastService} from "./toast.service";
import {IToast} from "./toast.interface";

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {

  aria = {
    alert: 'assertive',
    status: 'polite'
  }

  constructor(public toastService: ToastService) {
  }

  removeToast(toastId: number) {
      this.toastService.remove(toastId);
  }
}