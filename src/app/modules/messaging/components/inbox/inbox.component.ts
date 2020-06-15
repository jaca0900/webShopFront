import { GenericListComponent } from '../../../shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../shared/constants';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-inbox',
  templateUrl: 'inbox.component.html',
  // styleUrls: ['shopList.component.scss']
})
export class InboxComponent implements OnInit {
  searchVal: string;
  messages: any[];
  selectedMessage: any;
  view: any[];

  constructor (private router: Router, private messageService: MessageService) {
    this.messages = [];
  }

  ngOnInit(): void {
    this.searchVal = '';
    console.log('This is strange')

    // this.messages.push({
    //   title: 'test',
    //   content: 'soomeContent',
    //   sendDate: new Date()
    // })

    this.messageService.getReceived()
      .subscribe((messages) => {
        console.log('Received', messages);
        this.view = this.messages = messages;
      }, (error) => {
        console.error(error);
      });
  }

  setView(data: any[]) {
    this.view = data;
  }

  readMessage(message) {
    StorageService.setItem('MESSAGE', message);
    this.router.navigate([CONSTANTS.MAIN_ROUTES.MESSAGEREAD]);
  }
}