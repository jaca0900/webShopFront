import {Injectable} from "@angular/core";
import {IToast} from "./toast.interface";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: IToast[] = [];

    // Push new Toasts to array with content and options
    show({title, message, classname}) {
        this.toasts.push({
            id: this.toasts.length,
            title,
            message,
            classname,
            created: new Date()
        });
    }

    // Callback method to remove Toast DOM element from view
    remove(toastId: number) {
        this.toasts = this.toasts.filter(({id}) => id !== toastId);
    }
}