import { Component, OnInit } from '@angular/core';
import { IItem } from '../../models/item.interface';
import { ItemService } from '../services/item.service';
import { FileService } from './services/file.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import {ToastService} from "../../../shared/components/toast/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: 'addItem.component.html',
  styleUrls: ['addItem.component.scss']
})
export class AddItemComponent implements OnInit {
  newItem: IItem;
  selectedFiles: File[];

  constructor (private itemService: ItemService,
    private fileService: FileService,
    private toastService: ToastService) {}

  ngOnInit(): void {

    this.newItem = {
      id: 0,
      name: '',
      description: '',
      quantity: 0,
      startDate: new Date(),
      endDate: new Date(),
      createDate: new Date(),
      item_price: 0,
      amount_left: 0,
      user_id: StorageService.getItem('USER').id,
      images: [],
      user: { account: '' }
    };

    this.selectedFiles = [];
  }

  saveItem() {
    this.itemService.create(this.newItem)
      .subscribe((res) => {
        return Promise.all(this.selectedFiles.map(file => {
          return this.fileService.upload(file, res.id).toPromise();
        }))
          .then(() => {
            this.toastService.show({
              title: 'Success',
              classname: 'bg-success',
              message: 'Item added successfully'
            });
          })
          .catch(err => {
            this.toastService.show({
              title: 'Error',
              classname: 'bg-danger',
              message: err.message
            });
          });
      }, (err) => {
        console.error(err);
      });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      const index = this.selectedFiles.findIndex((item) => {
        return item.name === file.name;
      });

      if (index < 0) {
        this.selectedFiles.push(file);
      }
    });

    reader.readAsDataURL(file);
  }

  removeFile(fileName) {
    const index = this.selectedFiles.findIndex((item) => {
      return item.name === fileName;
    });

    this.selectedFiles.splice(index, 1);
  }
}
